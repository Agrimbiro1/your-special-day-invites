import sharp from "sharp";
import path from "path";

const inputPath = "public/assets/bg-thankyou-custom.jpg";
const outputDir = "public/assets";

async function processCutouts() {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  // 1. COUPLE LAYER
  // Bounding box for Couple: left 0, top ~460, w ~360, h ~564
  const cLeft = 0;
  const cTop = Math.floor(height * 0.45);
  const cWidth = Math.floor(width * 0.63);
  const cHeight = height - cTop;

  const coupleRaw = await sharp(inputPath)
    .extract({ left: cLeft, top: cTop, width: cWidth, height: cHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: cData, info: cInfo } = coupleRaw;

  // Process alpha mask for Couple: remove background cream/sky tones outside couple silhouette
  for (let i = 0; i < cData.length; i += 4) {
    const r = cData[i];
    const g = cData[i + 1];
    const b = cData[i + 2];
    const pixelIdx = i / 4;
    const x = pixelIdx % cInfo.width;
    const y = Math.floor(pixelIdx / cInfo.width);

    // Background sky/wall pixels behind couple: high brightness cream/sky above y threshold
    const isCreamWall = r > 215 && g > 215 && b > 210;
    const isSkyBlue = r > 210 && g > 225 && b > 230;
    const isRightOfCouple = x > cInfo.width * 0.72 && y < cInfo.height * 0.6;

    if (isCreamWall || isSkyBlue || isRightOfCouple) {
      // Make transparent
      cData[i + 3] = 0;
    }
  }

  await sharp(cData, {
    raw: { width: cInfo.width, height: cInfo.height, channels: 4 }
  })
  .png()
  .toFile(path.join(outputDir, "ty-couple-transparent.png"));

  // 2. ELEPHANT & PAVILION LAYER
  // Bounding box for Elephant: left ~300, top ~600, w ~276, h ~424
  const eLeft = Math.floor(width * 0.54);
  const eTop = Math.floor(height * 0.56);
  const eWidth = width - eLeft;
  const eHeight = height - eTop;

  const elephantRaw = await sharp(inputPath)
    .extract({ left: eLeft, top: eTop, width: eWidth, height: eHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: eData, info: eInfo } = elephantRaw;

  for (let i = 0; i < eData.length; i += 4) {
    const r = eData[i];
    const g = eData[i + 1];
    const b = eData[i + 2];
    const pixelIdx = i / 4;
    const x = pixelIdx % eInfo.width;
    const y = Math.floor(pixelIdx / eInfo.width);

    // Background sky above elephant
    const isSky = r > 210 && g > 225 && b > 235 && y < eInfo.height * 0.45;
    const isCream = r > 230 && g > 225 && b > 215 && y < eInfo.height * 0.35;

    if (isSky || isCream) {
      eData[i + 3] = 0;
    }
  }

  await sharp(eData, {
    raw: { width: eInfo.width, height: eInfo.height, channels: 4 }
  })
  .png()
  .toFile(path.join(outputDir, "ty-elephant-transparent.png"));

  console.log("Cutouts created successfully!");
}

processCutouts().catch(console.error);
