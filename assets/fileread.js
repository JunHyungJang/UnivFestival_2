const fs = require("fs")
// import path from 'path';
const path = require('path')

const university = [

]
const imagesDir = path.join(process.cwd(), '/UnivFestival/assets/univimage');
console.log(imagesDir)
const images =  fs.readdir(imagesDir)
  .then((files) =>
    files.reduce((acc, file) => {
      const imageName = path.parse(file).name;
      const imagePath = path.join(imagesDir, file);
      const urlpath = `../../assets/univimage/${imageName}.jpg`
    //   console.log(urlpath)
      acc[imageName] = imagePath;
      university.push({univ: imageName, urlpath: urlpath})
      return acc;
    }, {})
  );

console.log(university)
 fs.writeFile('./university.js', `export default ${JSON.stringify(university)};`);