import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import RootStackParamList from '../../AppInner';
import { RootState } from '../store/reducer';
import SearchFestival from './SearchFestival';

function Changepassword({navigation}: any) {

  const [password, setPassword] = useState('');
  const [confirmpassword,setconfirmpassword] = useState('');
  const email = useSelector((state: RootState) => state.user.email);

  

  const onChangePassword = (text: string) => {
    console.log(text)
    setPassword(text);
  };

  const onChangeconfirmPassword = (text:string) => {
    console.log(text)
    setconfirmpassword(text);
  }

  const onSubmit = async () => {
    console.log(password,confirmpassword)
    if (password !== confirmpassword) {
      return Alert.alert('알림', '비밀번호를 다시 확인해주세요.');
    }
  
    
    // const response = await axios.post(`${Config.API_URL}/api/users/register`, {
    //   email,
    //   name,
    //   password,
    //   univ,
    // });
    const response = await axios.post(`${Config.API_URL}/api/users/changepassword`, {
        password,
        email
    })

    if (response.data.success == true) {
      Alert.alert('알림', '성공적으로 변경되었습니다.');
    //   navigation.navigate('SignIn');
    } else if (response.data.success == false) {
      Alert.alert('알림', '비밀번호 변경이 실패하였습니다.');
    }
  };


  return (
  
    <View>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>새 비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          //   ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>새 비밀번호 확인</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangeconfirmPassword}
          value={confirmpassword}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          //   ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>

      <View style={styles.buttonZone}>
        <Pressable
          style={
              StyleSheet.compose(styles.loginButton, styles.loginButtonActive)}
            onPress={onSubmit}>
          <Text style={{color: 'white', fontSize: 16, fontFamily: 'BMHANNAPro'}}>변경하기</Text>
        </Pressable>
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

export default Changepassword;
