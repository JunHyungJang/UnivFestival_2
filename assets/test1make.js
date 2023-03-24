// import test1 from './test1'
// const test1 = require('/test1')
// const fs = require('fs')
// const path = require('path')

const fs = require('fs');
const path = require('path');

const directoryPath = './UnivFestival/assets/univimage'; // 파일들이 저장된 디렉토리 경로
console.log(directoryPath)
fs.readdir(directoryPath, function(err, files) {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const universities = files
    .filter(file => path.extname(file) === '.jpg') // .jpg 확장자를 가진 파일만 필터링
    .map(file => ({
      university: path.basename(file, '.jpg'), // 파일명에서 .jpg 확장자 제외한 이름을 university 속성 값으로 사용
      univurl: require(`../../assets/univimage/${path.basename(file, '.jpg')}`) // 파일 경로를 합쳐서 require로 이미지 파일을 불러옴
    }));

  console.log(universities);
});
