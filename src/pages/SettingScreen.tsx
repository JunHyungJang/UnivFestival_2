import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

function SettingScreen({navigation}: any) {
  const name = useSelector((state: RootState) => state.user.name);
  const email = useSelector((state: RootState) => state.user.email);
  const univ = useSelector((state: RootState) => state.user.univ)

  return (
    <View>
      <Text style = {{fontSize: 50, marginLeft: 10,fontFamily: 'BMHANNAPro'}}>
        개인정보
      </Text>
      <View style={{ borderBottomWidth: 1 }} />
      <View style = {{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30, }}>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> 이름</Text>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> {name}</Text>
      </View>
      <View style = {{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30, }}>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> 아이디</Text>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> {email}</Text>
      </View>
      <View style = {{flexDirection: 'row',justifyContent: 'space-between', marginTop: 30, }}>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> 학교</Text>
        <Text style = {{fontSize: 30,fontFamily: 'BMHANNAPro'}}> {univ}</Text>
        {/* <Text>hello</Text> */}
      </View>
      <View style = {{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity activeOpacity={0.2} 
        style = {{width:100, height: 40, backgroundColor: 'rgba(141, 216, 239, 1)', justifyContent: 'center', alignItems: 'center', borderRadius: 20}} onPress = {()=> navigation.navigate("Mybooth") }>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          내 부스 관리하기
        </Text>
      </TouchableOpacity>
      </View>
      

      
    </View>
  );
}

export default SettingScreen;
