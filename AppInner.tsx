import React from 'react';
import {Button, Text, View} from 'react-native';
import {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {NavigationContainer} from '@react-navigation/native';
// import MainPage from './src/pages/Mainpage';
import {useAppDispatch} from './src/store';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainPage from './src/pages/Mainpage';
// import MainPage2 from './src/pages/Mainpage2';

function AppInner() {
  return (
    // <SafeAreaProvider>
      <NavigationContainer>
        <MainPage />    
      </NavigationContainer>
    // </SafeAreaProvider>  
  );
}

export default AppInner;
