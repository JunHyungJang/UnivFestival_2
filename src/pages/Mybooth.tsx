import { ListItem, Avatar } from '@rneui/base';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View, Linking, Alert, ScrollView, Button, TouchableOpacity, FlatList} from 'react-native';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';


function Mybooth(route : any) {
    
    const email = useSelector((state: RootState) => state.user.email);
    const univ = useSelector((state:RootState) => state.user.univ)
    // const a = "hello"
    const [listitem,setlistitem] = useState([]);
    useEffect(()=> {
        const fetchdata = async() => {
            try {
                const response = await axios.post(`${Config.API_URL}/api/univ/getmybooth`,
                {univ,email})
                setlistitem(response.data.data)
            }
            catch(error) {
                console.log(error)
            }
        };
        fetchdata();
    },[listitem])

    const deleteitem = (item : any) => {
        console.log('deleteitem');
        const fetchdata = async() => {
            try{
                const response = await axios.post(`${Config.API_URL}/api/univ/deletebooth`,{item,univ})
            }
            catch(error) {
                console.log(error);
            };
        }
        fetchdata();

    }

    const renderItem = ({ item } : any) => (
        <View style = {{}} >
          
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
         <TouchableOpacity  activeOpacity={0.3} onPress = {()=> deleteitem(item)}  style = {{backgroundColor: 'rgba(141, 216, 239, 1)',
          borderRadius: 10, width: 40, height: 40, alignItems: 'center', 
          justifyContent: 'center', marginBottom: 50}}  >
            <Text style= {{fontFamily: 'BMHANNAPro'}}>
                   삭제
            </Text>
        </TouchableOpacity>
         </ListItem>
         </View>
       );
    return (
        <View>
           <FlatList
            data = {listitem}
            renderItem={renderItem}/>
        </View>
    )
}

export default Mybooth;