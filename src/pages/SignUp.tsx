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
import RootStackParamList from '../../AppInner';
import SearchFestival from './SearchFestival';

// type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [univ, setuniv] = useState('');
    const renderItem = ({item} : any) => {
      return (
        <TouchableOpacity onPress={() => (Alert.alert('item'))}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )
    }
  

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);
  const onChangeUniv = useCallback((text: string) => {
    setuniv(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!univ || !password.trim()) {
      return Alert.alert('알림', '대학교를 입력해주세요.');
    }
    console.log(email, name, password);
    const response = await axios.post(`${Config.API_URL}/api/users/register`, {
      email,
      name,
      password,
      univ,
    });
    if (response.data.success == true) {
      Alert.alert('알림', '회원가입 성공적으로 되었습니다.');
      navigation.navigate('SignIn');
    } else if (response.data.success == false) {
      Alert.alert('알림', '회원가입이 실패하였습니다.');
    }
  }, [email, name, password]);

  const canGoNext = email && name && password && univ;


  //Searchpage copy
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setdata] = useState([])



  const updateSearch = (search: string) => {
    getname(search)
    setuniv(search)
    
  };


  const getname = useCallback(async (univ:any) => {
      try {
        const response = await axios.post(`${Config.API_URL}/api/univ/getunivname`, {
          univ
        });
        setdata(response.data.arrdata);
        
      }
      catch(error){
        console.log(error)
      }
  },[])



  return (
  
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          //   ref={emailRef}
          //   onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          //   ref={nameRef}
          //   onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>대학명</Text>
        </View>
        <View style = {{display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 20}} >
       <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss}>
        <SafeAreaView style = {{flex : 1}}>
            <TextInput
            placeholder='입력해주세요'
            onChangeText={updateSearch}
            style ={{
                height: 40,
                marginHorizontal: 12,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
            }} 
            value = {univ}/>
           <FlatList
           data = {data}
           renderItem = {({item,index}) => (
            <Pressable onPress={()=> {
              setuniv(item)
              setdata([])
            }}>
              <View style = {{flexDirection: 'row',alignItems: 'center',padding: 15, marginLeft: 10 }}>
              <Icon name = "school" size={30}/>
                <Text style = {{marginLeft: 10, fontFamily: 'BMHANNAPro'}}>
                  {item}
                </Text>
              </View>
            </Pressable>
            
          )}/>
            
            
        </SafeAreaView>
    </TouchableWithoutFeedback> 
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
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
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!canGoNext}
          onPress={onSubmit}>
          <Text style={styles.loginButtonText}>회원가입</Text>
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

export default SignUp;
