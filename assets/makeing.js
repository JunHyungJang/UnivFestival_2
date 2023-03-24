import React, {useState} from 'react';
import fs from 'fs-extra'; // fs-extra 모듈 사용
import univimage from './univimage'

const universities = [];

// 파일 이름에서 대학교 이름을 추출하는 함수
const extractUniversityName = (filename) => {
  const nameWithoutExtension = filename.split('.')[0]; // 파일 확장자를 제외한 파일 이름 추출
  const universityName = nameWithoutExtension.replace(/_/g, ' '); // 언더바(_)를 공백으로 대체
  return universityName;
};

// 파일 순회 및 객체 생성
const importUniversities = () => {
  const files = require.context('../../assets/univimage', false, /\.jpg$/);
  files.keys().forEach((univimage) => {
    const universityName = extractUniversityName(univimage);
    const univurl = files(univimage);
    universities.push({ university: universityName, univurl });
  });
};

// universities 배열을 JSON 형식으로 저장하는 함수
const saveUniversitiesToFile = (filename) => {
  const data = JSON.stringify(universities, null, 2);
  fs.writeFileSync(filename, data, 'utf-8');
};

// importUniversities 함수 실행
importUniversities();

// universities 배열을 파일로 저장
saveUniversitiesToFile('universities.json');
