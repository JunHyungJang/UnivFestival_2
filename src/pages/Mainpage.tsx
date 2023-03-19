// main page

import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import SearchFestival from './SearchFestival';
import UnivInfo from './UnivInfo';
import Boothpage from './Boothpage';
import Univdetail from './Univdetail';
import Boothmake from './Boothmake';
import Boothdetail from './Boothdetail';
import Mybooth from './Mybooth';


export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Firstpage: undefined;
  SearchFestival: undefined;
  UnivInfo: undefined;
  Boothpage: undefined;
  Univdetail: undefined;
  Boothmake: undefined;
  Boothdetail: undefined;
  Mybooth: undefined;
};
export type LoggedInParamList = {
  HomeScreen: undefined;
  SettingScreen: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Boothpage: undefined;
  Univdetail: undefined;
  Boothmake: undefined;
  Boothdetail: undefined;
  Mybooth: undefined;



};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<LoggedInParamList>();


const url_ios = "http://localhost:5000"
const url_android = "http://10.0.2.2:5000"


function MainPage() {
  
    const accessToken = useSelector((state: RootState) => state.user.accessToken);
    const dispatch = useAppDispatch();

    
    
    const onLogout = useCallback(async () => {
    
      
      try {
        console.log('front logout');
        await axios.post(`${Config.API_URL}/api/users/logout`, {
          accessToken,
        });
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
        const errorResponse = (error as AxiosError).response;
        console.error(errorResponse);
      }
    }, []);
    
    const DrawNavigation = ({navigation}: any) => {
      const isLogin = useSelector((state: RootState) => !!state.user.email);
      
      return (
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            drawerStyle: {width: '80%'},
            overlayColor: 'transparent',
            headerTitle: '',
            headerRight: () => (
              <View>
                {isLogin ? (
             
                  <TouchableOpacity activeOpacity={0.3} style= {{backgroundColor: 'rgba(200, 48, 130, 0.42)', borderRadius: 20, width: 80, height: 40, alignItems: 'center', justifyContent: 'center'}}
                  onPress = {()=>{onLogout()}}>
                    <Text>
                      로그아웃
                    </Text>
                  </TouchableOpacity>
                
                ) : (
                  <TouchableOpacity activeOpacity={0.3} style= {{backgroundColor: 'rgba(200, 48, 130, 0.42)', borderRadius: 20, width: 80, height: 40, alignItems: 'center', justifyContent: 'center'}}
                  onPress = {() =>{ navigation.navigate('SignIn')}}>
                    <Text>
                      로그인
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ),
          }}>
           
       
           <Drawer.Screen name="HomeScreen" component={HomeScreen} options= {{title: "메인화면"}} />    
           {isLogin && (
           <Drawer.Screen name="SettingScreen" component={SettingScreen} options= {{title: '내정보'}}></Drawer.Screen>
           )}

          
        </Drawer.Navigator>
      );
    };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Firstpage"
        component={DrawNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
      <Stack.Screen name="SearchFestival" options = {{title: '검색'}}component={SearchFestival} />
      <Stack.Screen name="UnivInfo" options = {{title: '학교정보'}} component={UnivInfo} />
      <Stack.Screen name="Boothpage" options = {{title: '부스페이지'}} component={Boothpage} />
      <Stack.Screen name="Univdetail" options = {{title: '학교세부정보'}} component={Univdetail} />
      <Stack.Screen name= "Boothmake" options = {{title: '부스만들기'}} component={Boothmake} />
      <Stack.Screen name= "Boothdetail" options = {{title: '부스세부정보'}} component={Boothdetail}/>
      <Stack.Screen name= "Mybooth" options = {{title: '내 부스'}} component={Mybooth}/>


    </Stack.Navigator>
    
  );
}

export default MainPage;
