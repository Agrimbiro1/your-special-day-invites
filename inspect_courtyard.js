import sharp from "sharp";

async function inspect() {
  const metadata = await sharp("public/assets/bg-courtyard-custom.jpg").metadata();
  console.log("Courtyard dimensions:", metadata.width, "x", metadata.height);
}

inspect().catch(console.error);
