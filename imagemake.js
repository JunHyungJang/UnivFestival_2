const fs = require('fs');
const path = require('path');

const imagesDir = '/Users/jangjungi/Desktop/Univ_festival_2/UnivFestival_2/assets/univimage';
const images = fs.readdirSync(imagesDir)
  .reduce((acc, file) => {
    const imageName = path.parse(file).name;
    const imagePath = path.join(imagesDir, file);
    acc[imageName] = imagePath;
    return acc;
  }, {});

fs.writeFileSync('./images.js', `export default ${JSON.stringify(images)};`);
