import sharp from "sharp";
import path from "path";

const inputPath = "public/assets/bg-thankyou-custom.jpg";
const outputPath = "public/assets/bg-thankyou-clean.jpg";

async function createCleanBg() {
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  // We want to create a clean background where the couple (bottom left) and elephant (bottom right)
  // are replaced with clean watercolor landscape/sky background.

  // Extract a clean section of the sky/lake background (e.g. middle region above couple/elephant: y: 30% to 55%)
  const skyPatch = await sharp(inputPath)
    .extract({
      left: Math.floor(width * 0.1),
      top: Math.floor(height * 0.25),
      width: Math.floor(width * 0.8),
      height: Math.floor(height * 0.28),
    })
    .resize(width, height)
    .blur(18)
    .toBuffer();

  // Create clean base: composite sky patch over bottom area of original image
  // Mask out the bottom 55% of the original image with clean watercolor sky texture
  const originalRaw = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = originalRaw;

  // Read skyPatch buffer
  const skyRaw = await sharp(skyPatch).resize(width, height).raw().toBuffer({ resolveWithObject: true });
  const skyData = skyRaw.data;

  // Replace pixels in couple (left < 65%, top > 45%) and elephant (right > 55%, top > 55%) with sky/watercolor texture
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const isCoupleArea = x < width * 0.65 && y > height * 0.46;
      const isElephantArea = x > width * 0.52 && y > height * 0.57;

      if (isCoupleArea || isElephantArea) {
        // Blend with smooth edge gradient
        let blendFactor = 1.0;

        // Smooth transition edge for couple area top boundary
        if (isCoupleArea && y < height * 0.52) {
          blendFactor = (y - height * 0.46) / (height * 0.06);
        }
        // Smooth transition edge for elephant area top boundary
        if (isElephantArea && y < height * 0.63) {
          blendFactor = (y - height * 0.57) / (height * 0.06);
        }

        blendFactor = Math.min(1.0, Math.max(0.0, blendFactor));

        data[idx] = Math.round(data[idx] * (1 - blendFactor) + skyData[idx] * blendFactor);
        data[idx + 1] = Math.round(data[idx + 1] * (1 - blendFactor) + skyData[idx + 1] * blendFactor);
        data[idx + 2] = Math.round(data[idx + 2] * (1 - blendFactor) + skyData[idx + 2] * blendFactor);
      }
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log("Created clean background without couple/elephant static overlap!");
}

createCleanBg().catch(console.error);
