const fs = require('fs');
const path = require('path');

const universities = [];

const imagesDir = '/Users/jangjungi/Desktop/Univ_festival_2/UnivFestival_2/assets/univimage';
const images = fs.readdirSync(imagesDir)
  .reduce((acc, file) => {
    const files = require.context('../../assets/univimage', false, /\.jpg$/);
    const imageName = path.parse(file).name;
    const imagePath = path.join(imagesDir, file);
    const univurl = files(Imagename)
    universities.push({university: ImageName, univurl: univurl})
    return universities;
  }, {});

fs.writeFileSync('./images.js', `export default ${JSON.stringify(universities)};`);
