import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import {Avatar, ListItem} from '@rneui/themed'
import { Button } from '@rneui/base';
import { RotateInUpLeft } from 'react-native-reanimated';
import { iteratorSymbol } from 'immer/dist/internal';
import axios from 'axios';
import Config from 'react-native-config';





function Boothpage(route: any) {
  
  const isLogin = useSelector((state: RootState) => !!state.user.email);
  const useruniv = useSelector((state:RootState) => state.user.univ)


  const univinfo = route.route.params.univinfo
  const univ = univinfo.name;
  
  const [listitem,setlistitem] = useState([])
  useEffect(()=> {
    
    const fetchdata = async() => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/univ/getboothinfo`, {
      univ
      });
      setlistitem(response.data.data)
      
    }
    catch(error) { 
      console.log(error)
    }
  };
  fetchdata();
  },[listitem])

  const renderItem = ({ item } : any) => (
   <View >
     
   <ListItem bottomDivider onPress={()=> route.navigation.navigate('Boothdetail', {booth: item})}>
    <ListItem.Content>
    <Avatar
      rounded
      icon={{
        name: 'person-outline',
        type: 'material',
        size: 26,
      }}
      containerStyle={{ backgroundColor: '#c2c2c2' }}
    />
      <ListItem.Title style = {{fontFamily: 'BMHANNAPro'}}>{item.name}</ListItem.Title>
      <ListItem.Subtitle style = {{fontFamily: 'BMHANNAPro'}}>{item.info}</ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
    </View>
  );

  return (
  <View>
  <View style = {{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
    <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', 
    borderRadius:20, width: 80, height: 40, alignItems: 'center', justifyContent: 'center'}}  
            onPress={() => {
              if (isLogin) {
                if (useruniv == univ){
                route.navigation.navigate('Boothmake', {listitem: listitem, univ: univ})
                }
                else {Alert.alert("해당학교의 대학생만 이용 가능합니다.")}
                // route.navigation.navigate('SignUp')
              }
              else {
                Alert.alert("로그인후 이용이 가능합니다");
                route.navigation.navigate('SignUp');
              }
              }}>
      <Text style= {{fontFamily: 'BMHANNAPro'}}>
        부스생성
      </Text>
    </TouchableOpacity>
    </View>
    <FlatList
    data = {listitem}
    renderItem={renderItem}/>
  </View>
    
  );
}

export default Boothpage;
