import axios, { AxiosError } from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import userSlice from '../slices/user';
import { useAppDispatch } from '../store';
import {RootState} from '../store/reducer';

function SettingScreen({navigation}: any) {
  const name = useSelector((state: RootState) => state.user.name);
  const email = useSelector((state: RootState) => state.user.email);
  const univ = useSelector((state: RootState) => state.user.univ)
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();


  const onLogout = useCallback(async () => {
    
      
    try {
      console.log('front logout');
      await axios.post(`${Config.API_URL}/api/users/logout`, {
        accessToken,
      });
      console.log("hellwoorld")
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          email: '',
          accessToken: '',
        }),
      );
      await EncryptedStorage.removeItem('Token');
    } catch (error) {
      console.log("erroroccur")
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
    // navigation.navigate("HomeScreen")
  }, []);
  const deleteaccount = useCallback(async ()=> {
      axios.post(`${Config.API_URL}/api/users/deleteaccount`, {
        email
      })
      onLogout()
  },[])

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
      <View style = {{marginTop: 40, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
      <TouchableOpacity activeOpacity={0.2} 
        style = {{width:100, height: 40, backgroundColor: 'rgba(141, 216, 239, 1)', justifyContent: 'center', alignItems: 'center', borderRadius: 20}} onPress = {()=> navigation.navigate("Changepassword") }>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          비밀번호 변경
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.2} 
        style = {{width:100, height: 40, backgroundColor: 'rgba(141, 216, 239, 1)', justifyContent: 'center', alignItems: 'center', borderRadius: 20}} onPress = {()=> navigation.navigate("Mybooth") }>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          내 부스 관리하기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.2} 
        style = {{width:100, height: 40, backgroundColor: 'rgba(141, 216, 239, 1)', 
        justifyContent: 'center', alignItems: 'center', borderRadius: 20}} 
        onPress = {()=> Alert.alert(
          '계정삭제',
          '계정을 삭제하시겠습니까 ? ',
          [
            {text: '취소', onPress : () => console.log('취소 선택')},
            {text: '확인', onPress : ()=> deleteaccount()}
          ]
        ) }>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          계정 삭제하기
        </Text>
      </TouchableOpacity>
      </View>
      

      
    </View>
  );
}

export default SettingScreen;
function dispatch(arg0: { payload: any; type: "user/setUser"; }) {
  throw new Error('Function not implemented.');
}

