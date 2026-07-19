const fs = require('fs');
const path = require('path');
const https = require('https');

const imagePaths = [
  '/images/affiliates/sony.jpg',
  '/images/affiliates/course.jpg',
  '/images/affiliates/book.jpg',
  '/images/products/nextjs-1.jpg',
  '/images/products/nextjs-2.jpg',
  '/images/products/cn-1.jpg',
  '/images/products/notion-1.jpg',
  '/images/products/notion-2.jpg',
  '/images/products/notion-3.jpg',
  '/images/products/dsa-1.jpg'
];

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302) {
        https.get(response.headers.location, (response2) => {
          const file = fs.createWriteStream(dest);
          response2.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', reject);
  });
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  
  for (const imgPath of imagePaths) {
    const fullPath = path.join(publicDir, imgPath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    console.log(`Downloading ${imgPath}...`);
    try {
      await downloadImage('https://picsum.photos/400/300', fullPath);
    } catch (e) {
      console.error(`Failed to download ${imgPath}`, e);
    }
  }
  console.log("Done downloading images.");
}

main();
