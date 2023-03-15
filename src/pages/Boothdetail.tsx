import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function Boothdetail(route: any) {
    //로그인시 들어오는 거 가능

    const name = route.route.params.booth.name;
    const info = route.route.params.booth.info;
    const menu = route.route.params.booth.menu;
    console.log(menu);
    
  return (

    <ScrollView>
      <View style = {{justifyContent: 'center', alignItems: 'center', paddingTop: 40}}>
        <Text style = {{fontSize: 80 , fontFamily: 'BMHANNAPro'}}>
          {name}
        </Text>
        <Text style = {{fontSize: 20 , fontFamily: 'BMHANNAPro'}}>
          {info}
        </Text>
      </View>
      <View style = {{borderWidth: 1, paddingLeft: 10, marginHorizontal: 25}}/>
      <View style = {{flexDirection: 'column', justifyContent:'space-around', marginTop: 20, marginLeft: 50, marginRight: 50}}>
      {menu.map((item:any,index:any) => (
        <View key  = {index} style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
          <Text style = {{fontSize: 25 , fontFamily: 'BMHANNAPro'}}>
          {item.name}
          </Text>
          <Text style = {{fontSize: 25 , fontFamily: 'BMHANNAPro'}}>
            {item.price}
          </Text>
        </View>
  
      ))}
      
      </View>
      
      
    </ScrollView>
  );
}


export default Boothdetail;
