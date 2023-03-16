import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {navigation} from 'react-native-navi'
import allunivinfo from "../data/allunivinfo.json"


function Univdetail(route: any) {
  // console.log(route.route.params.univinfo)
  const univinfo = route.route.params.univinfo;

 
  let info = allunivinfo.filter(function(e) {
    return e.학교명 == univinfo.name || e['학교명(영문)']== univinfo.name 
  })
  const set1 = ['학교명   ','전화번호','주소     ','우편번호','홈페이지'];
  const set2 = [info[0].학교명,info[0].전화번호,info[0].주소,info[0].우편번호,info[0].홈페이지]
  return (
    <View >
      <View style = {{paddingBottom: 30}}>
          <Text style = {{justifyContent: 'center', alignSelf: 'center',fontFamily: 'BMHANNAPro' ,fontSize: 50 }}>
            학교정보
          </Text>
      </View>
          
          {set1.map((item,index) => (
          <View key = {index} style = {{flexDirection: 'row'}}>
          <Text style = {{marginLeft: 50,fontFamily: 'BMHANNAPro' ,fontSize: 20}}>
            {set1[index]}
          </Text>
          <Text style = {{marginLeft: 70,fontFamily: 'BMHANNAPro',fontSize: 20}}>
            :
          </Text>
          <Text style = {{width:'100%', flexShrink: 1, marginLeft: 10 , fontFamily: 'BMHANNAPro',fontSize: 20}}>
            {set2[index]}
          </Text>
        </View>
        ))}
    </View>
  );
}


export default Univdetail;
