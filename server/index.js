const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const { encode } = require('blurhash');
const sharp = require('sharp');
/* const { importImagesUrls } = require('./utils/images.js'); */
const db = require('./db.js')

const app = express();

/* const image_dir_path = path.join(__dirname, "images"); */

app.use(cors());
app.use(express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => res.send("Hello Server!"));

app.get("/images", async (req, res) => {
  /* const db = await import("./db.js"); */

  res.json(db);
});


const encodeToBlurhash = (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);

        resolve(
          encode(new Uint8ClampedArray(buffer), width, height, 4, 4)
        );
      });
  });

/*** ***** ***** ****
async function encodeAllImages() {
  const imagesNames = await fs.readdir(image_dir_path);

  console.log(imagesNames)
  const data = [];

  for (const name of imagesNames) {
    const encodedHash = await encodeToBlurhash(
      path.join(__dirname, "images", name)
    );
    
    data.push({ name, blurhash: encodedHash });
    console.log("Hash: ", encodedHash);
  }

  console.log(data);
}

encodeAllImages();


const toBlurhash = async () => {
  const image_path = path.join(__dirname, 'Coffee-background.png')

  const encodedHash = await encodeToBlurhash(image_path)
  console.log('Encoded Hash: ', encodedHash)
}

toBlurhash()
**** ***** ***** ***/

app.listen(8000, () => {
  console.log("Server listening on PORT", 8000);

})