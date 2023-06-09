import React, {useCallback, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import Findpassword from './Findpassword';

function SignIn({navigation}: any) {
  
 
  
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    console.log("subit")
    console.log(Config.API_URL)
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    try { 
      const response = await axios.post(`${Config.API_URL}/api/users/login`, {
        email,
        password,
      });
      console.log("submit2")
      if (response.data.success == false) {
        Alert.alert('알림', response.data.message);
      } else {
        console.log(response.data);
        console.log(response.data.name);
        console.log(response.data.email);
        Alert.alert('알림', '로그인 되었습니다.');
        dispatch(
          userSlice.actions.setUser({
            name: response.data.name,
            email: response.data.email,
            accessToken: response.data.token,
            univ: response.data.univ,
          }),
        );
        await EncryptedStorage.setItem('Token', response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('HomeScreen');
  }, [email, password]);

  const canGoNext = email && password;

  return (
    <View>
      <View style={{padding: 20}}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          onChangeText={onChangePassword}
          value={password}
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          onSubmitEditing={onSubmit}
        />
      </View>
     
        
        <View style = {{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity  activeOpacity={0.3} style = {{ backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={onSubmit}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  로그인
                  </Text>
          </TouchableOpacity>
          <View style = {{ flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity  activeOpacity={0.3} style = {{ borderRadius: 20, width: 100, height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
              onPress={toSignUp}>
                  <Text style= {{fontFamily: 'BMHANNAPro'}}>
                    회원가입하기
                    </Text>
            </TouchableOpacity>
            <Text>
            </Text>
            <TouchableOpacity  activeOpacity={0.3} style = {{ borderRadius: 20, width: 100, height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
              onPress={()=> navigation.navigate('Findpassword')}>
                  <Text style= {{fontFamily: 'BMHANNAPro'}}>
                    비밀번호 찾기
                    </Text>
            </TouchableOpacity>
          
          </View>
       
          </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignIn;
