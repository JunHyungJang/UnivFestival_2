import { isAnyOf } from '@reduxjs/toolkit';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View, TextInput, FlatList, Alert, ScrollView, TouchableOpacity} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Button } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Input} from '@rneui/themed'
import { onChange } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';
import UnivInfo from './UnivInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
// import { FlatList } from 'react-native-gesture-handler';

function Boothmake(route: any) {
  

    // console.log(route.route.params)
    // const listitem = route.route.params.listitem
    const [boothname, setboothname] = useState("");
    const [boothmainmenu, setboothmainmenu] = useState("");

    const user = useSelector((state: RootState) => state.user.email);


    const onChangeboothname = (text:any)=> {
      setboothname(text);
      console.log(boothname)
    };
    const onChangeboothmainmenu = (text:any) => {
      setboothmainmenu(text);
    };

    const [myarray, setmyarray] = useState([
      {name: '', price : ''},
    ])

    const onchangemyarray = (index: number, menu : string) => {
      setmyarray((prevList) => {
        const newList = [...prevList];
        newList[index].name = menu;
        return newList;
      });
      
    }

    const onchangemyarray2 = (index: number, price : string) => {
      setmyarray((prevList) => {
        const newList = [...prevList];
        newList[index].price = price
        return newList;
      });
    }

    const onplusmenu = () => {
      setmyarray(preList => [...preList,{name: '', price : ''}])
    }

    
    const ondeletearray = (deleteitem: string) => {
      const updatearray = [...myarray];
      const indextodelete = updatearray.findIndex(item => item.name === deleteitem);
      updatearray.splice(indextodelete,1);
      setmyarray(updatearray);
    }

    // 부스 등록버튼 
    const onsendarray = () => {
      const newlist = {
        univ : route.route.params.univ,
        name : boothname,
        user : user,
        info: boothmainmenu,
        menu : myarray
      }
      console.log(boothname)
      const sendapi = async() => 
    {try {  
        const response = await axios.post(`${Config.API_URL}/api/univ/addbooth`,{
          newlist 
        });

      }
      catch(error) {
        console.log(error);
      }
      // route.route.params.addlistitem(newlist);
      }
      sendapi();
      Alert.alert('알림', '부스가 성공적으로 등록되었습니다.')
      
      route.navigation.goBack()
    };
    
    
  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>부스이름</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeboothname}
          placeholder="부스이름을 입력해주세요"
          placeholderTextColor="#666"
          value={boothname}
          returnKeyType="next"
          clearButtonMode="while-editing"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>부스설명</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeboothmainmenu}
          value={boothmainmenu}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          blurOnSubmit={false}
        />
      </View>
      <View style = {{padding: 20}}>
        <Text style = {styles.label}>
          부스메뉴 
        </Text>
      </View>
      <View style = {{borderWidth: 0.5, paddingLeft: 10, marginHorizontal: 25, marginBottom: 10}}/>
      <View style = {{paddingRight: 120}}>
      <View style = {{padding: 20, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          메뉴
        </Text>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          가격
        </Text>
      </View>
      </View>

      <View style = {{flexDirection: 'column', justifyContent:'space-around'}}>
      {/* <View style = {{flexDirection: 'column', justifyContent: 'space-around'}}> */}
      {myarray.map((item, index) => (
        
        <View key = {index} style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20}}>
        <TextInput
        style={{flex: 1}}
        onChangeText={(newname) => onchangemyarray(index, newname)}
        placeholder="메뉴를 입력해주세요"
        value={item.name}     
        clearButtonMode="while-editing"
       
        textContentType="name"
        blurOnSubmit={false}>
        </TextInput>
        <TextInput
        style={{flex:1}}
        onChangeText={(newprice) => onchangemyarray2(index,newprice)}
        placeholder="가격을 입력해주세요"
        // placeholderTextColor="#666"
        value={item.price}
        returnKeyType="next"
        clearButtonMode="while-editing"
        textContentType="name"
        
        blurOnSubmit={false}>
        </TextInput>
        <Button  color = 'rgba(141, 216, 239, 1)'style =  {{}}onPress={() =>ondeletearray(item.name)}>
        <Text style = {{fontFamily: 'BMHANNAPro'}}>
          메뉴삭제하기
        </Text>
      </Button>
        </View>
        
      ))}
       
      {/* </View> */}
      

    <View>
      <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
      <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => onplusmenu()}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  메뉴 추가하기
                  </Text>
      </TouchableOpacity>
      <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 300, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => onsendarray()}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  부스 만들기
                  </Text>
          </TouchableOpacity>
      </View>
      </View>
      </View>
    </KeyboardAwareScrollView>
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
  textinput2 : {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});
export default Boothmake;
