import sharp from "sharp";

async function addFaces() {
  const bgPath = "public/assets/bg-courtyard-custom.jpg";
  const { width, height } = await sharp(bgPath).metadata();

  // Create crisp SVG facial features overlay for the couple
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c94a63" />
        <stop offset="100%" stop-color="#a33248" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f3d078" />
        <stop offset="100%" stop-color="#c99738" />
      </linearGradient>
    </defs>

    <!-- BRIDE FACE FEATURES (Centered around X: 254, Y: 708) -->
    <g id="bride-face">
      <!-- Soft Face shading & chin line -->
      <path d="M 235 690 Q 254 738 274 690" fill="none" stroke="#d49a84" stroke-width="1.2" opacity="0.4" />
      
      <!-- Eyebrows -->
      <path d="M 240 697 Q 247 692 254 696" stroke="#2c1a16" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <path d="M 260 696 Q 267 692 274 697" stroke="#2c1a16" stroke-width="2.2" stroke-linecap="round" fill="none" />

      <!-- Eyes & Lashes -->
      <!-- Left Eye -->
      <path d="M 241 702 Q 247 697 253 702" stroke="#231513" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M 243 703 Q 247 707 252 703" fill="#ffffff" opacity="0.9" />
      <circle cx="247" cy="703" r="2" fill="#2c1a16" />
      <circle cx="248" cy="702" r="0.6" fill="#ffffff" />
      <!-- Upper lashes -->
      <path d="M 239 700 Q 247 695 254 700" stroke="#1c100e" stroke-width="1.8" fill="none" />

      <!-- Right Eye -->
      <path d="M 261 702 Q 267 697 273 702" stroke="#231513" stroke-width="2" fill="none" stroke-linecap="round" />
      <circle cx="267" cy="703" r="2" fill="#2c1a16" />
      <circle cx="268" cy="702" r="0.6" fill="#ffffff" />
      <!-- Upper lashes -->
      <path d="M 259 700 Q 267 695 275 700" stroke="#1c100e" stroke-width="1.8" fill="none" />

      <!-- Bindi (Red) -->
      <circle cx="257" cy="693" r="2.2" fill="#b82337" />

      <!-- Nose Bridge & Tip -->
      <path d="M 257 697 L 256 708 Q 254 712 258 713" stroke="#c88b75" stroke-width="1.4" fill="none" stroke-linecap="round" />

      <!-- Nose Ring (Nath) -->
      <circle cx="252" cy="713" r="3.5" stroke="url(#goldGrad)" stroke-width="1.2" fill="none" />
      <path d="M 249 713 Q 238 710 234 705" stroke="url(#goldGrad)" stroke-width="0.8" fill="none" />

      <!-- Maang Tikka (Forehead Jewel) -->
      <circle cx="257" cy="687" r="2.5" fill="url(#goldGrad)" />
      <line x1="257" y1="680" x2="257" y2="685" stroke="url(#goldGrad)" stroke-width="1.2" />

      <!-- Lips & Smile -->
      <path d="M 249 720 Q 257 717 265 720 Q 257 727 249 720 Z" fill="url(#lipGrad)" />
      <path d="M 248 720 Q 257 722 266 720" stroke="#7a1c2d" stroke-width="1.2" fill="none" />

      <!-- Cheeks Warm Blush -->
      <ellipse cx="243" cy="712" rx="5" ry="3" fill="#e8808d" opacity="0.3" />
      <ellipse cx="271" cy="712" rx="5" ry="3" fill="#e8808d" opacity="0.3" />
    </g>

    <!-- GROOM FACE FEATURES (Centered around X: 318, Y: 686) -->
    <g id="groom-face">
      <!-- Eyebrows -->
      <path d="M 304 674 Q 312 670 320 673" stroke="#1d1514" stroke-width="2.8" stroke-linecap="round" fill="none" />
      <path d="M 326 673 Q 334 670 341 674" stroke="#1d1514" stroke-width="2.8" stroke-linecap="round" fill="none" />

      <!-- Eyes -->
      <!-- Left Eye -->
      <path d="M 306 680 Q 312 675 318 680" stroke="#1d1514" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <circle cx="312" cy="680" r="2" fill="#231715" />
      <circle cx="313" cy="679" r="0.6" fill="#ffffff" />

      <!-- Right Eye -->
      <path d="M 327 680 Q 333 675 339 680" stroke="#1d1514" stroke-width="2.2" fill="none" stroke-linecap="round" />
      <circle cx="333" cy="680" r="2" fill="#231715" />
      <circle cx="334" cy="679" r="0.6" fill="#ffffff" />

      <!-- Nose -->
      <path d="M 322 674 L 323 688 Q 320 692 325 693" stroke="#ba8270" stroke-width="1.6" fill="none" stroke-linecap="round" />

      <!-- Stylish Beard & Mustache -->
      <path d="M 314 695 Q 323 691 332 695 Q 323 700 314 695 Z" fill="#231715" opacity="0.9" />
      <path d="M 302 688 Q 300 705 312 715 Q 323 720 334 715 Q 345 705 343 688 Q 338 718 323 718 Q 307 718 302 688 Z" fill="#231715" opacity="0.88" />

      <!-- Lips -->
      <path d="M 316 701 Q 323 699 330 701 Q 323 705 316 701 Z" fill="#b35967" />
    </g>
  </svg>
  `;

  await sharp(bgPath)
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile("public/assets/bg-courtyard-custom.jpg.new");

  // Replace original file with newly updated version
  const fs = await import("fs");
  fs.renameSync("public/assets/bg-courtyard-custom.jpg.new", "public/assets/bg-courtyard-custom.jpg");

  console.log("Successfully added illustrated faces to the couple in Events section!");
}

addFaces().catch(console.error);
