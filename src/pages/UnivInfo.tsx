import React, { useCallback, useState } from 'react';
import {Image, StyleSheet, Text, View, Linking, Alert, ScrollView, Button, TouchableOpacity} from 'react-native';
import {Card} from '@rneui/base';
import { Link } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

function UnivInfo(route: any) {
  const univ = route.route.params.univinfo;

  const univname = univ.name;
  const location = univ.location;
  const time = univ.time;
  const urllink = univ.link;

  
  
  const set1 = ['대학이름', '장소     ', '일시     ']
  const set2 = [univname,location,time];
  const [count,setcount] = useState(5);
  
  
  const celeblist = univ.celeb.map((k : string, idx: any)  => {
  
    let content = k;
    if (idx !== (univ.celeb.length)-1) {
      content += ", "
    } 
    return(
      <View key = {idx}>
        <Text style = {{ fontFamily: 'BMHANNAPro',fontSize: 15  }}>{content}</Text>
      </View>
      )
  })
  return (
    <ScrollView>
    <View >
      <Image
        style={{ alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30}}
        source={require('../../assets/dgist_image.jpg')}
      />
        {set1.map((item,index) => (
          <View key = {index} style = {{flexDirection: 'row'}}>
          <Text style = {{marginLeft: 50,fontFamily: 'BMHANNAPro' ,fontSize: 15}}>
            {set1[index]}
          </Text>
          <Text style = {{marginLeft: 70,fontFamily: 'BMHANNAPro',fontSize: 15}}>
            :
          </Text>
          <Text style = {{marginLeft: 10 , fontFamily: 'BMHANNAPro',fontSize: 15}}>
            {set2[index]}
          </Text>
        </View>
        ))}
          <View  style = {{flexDirection: 'row'}}>
          <Text style = {{marginLeft: 50,fontFamily: 'BMHANNAPro' ,fontSize: 15}}>
            초청가수
          </Text>
          <Text style = {{marginLeft: 70,fontFamily: 'BMHANNAPro',fontSize: 15}}>
            :
          </Text>
          <Text style = {{marginLeft: 10 , fontFamily: 'BMHANNAPro',fontSize: 15}}>
          <View style = {{flexDirection: 'row'}}>{celeblist}</View>
           
          </Text>
    </View>
      
      
         <View style = {{flex:2, flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {Alert.alert("맵")}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  지도
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
          onPress = {() => {
            route.navigation.navigate('Boothpage',{univinfo: univ})
           }}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  부스
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {route.navigation.navigate("Univdetail", {univinfo:univ})}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  학교정보
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress = {async()=> {
              try {
                await Linking.openURL(`https://${urllink}`);
              }
              catch(error) {
                console.log('fail to open')
              }
            }}
            >
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  인스타링크
                  </Text>
          </TouchableOpacity>

          </View>

    </View>
    </ScrollView>


  );
}


export default UnivInfo;
