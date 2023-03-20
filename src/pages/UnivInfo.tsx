import React, { useCallback, useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View, Linking, Alert, ScrollView, Button, TouchableOpacity} from 'react-native';
import {Card} from '@rneui/base';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import axios from 'axios';
import Config from 'react-native-config';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import images from './images';

function UnivInfo(route: any) {
  const univ = route.route.params.univinfo;
    const univname = univ.name
    
  const location = univ.location;
  const time = univ.time;
  const urllink = univ.link;
  const isLogin = useSelector((state: RootState) => !!state.user.email);
  const email = useSelector((state: RootState) => state.user.email);

  const [urluniv,seturluniv] = useState('')

  const imageURL = Object.values(images).find(imagePath => imagePath.includes(univname));

  console.log("url")
  console.log(imageURL)
  // const imageURL = `file://Users/jangjungi/Desktop/Univ_festival_2/UnivFestival_2/assets/univimage/${univname}`
  // console.log(imageURL)

  const [refresh, setrefresh] = useState(0);
  const [heartcount, setheartcount] = useState(0);
  useEffect(()=> {
    seturluniv(univname)
    // imageURL = `../../assets/univimage/${urluniv}.jpg`
    const fetchdata = async() => {
      console.log('fetchdata');
      try {
        const response = await axios.post(`${Config.API_URL}/api/univ/heartcount`,
        {univname})
      // console.log("result")
      console.log(response.data)
      // console.log(typeof response.data)
      setheartcount(response.data);
      }
      catch(error) {
        console.log(error)
      }
      
    }
    const fetchheart = async() => {
      console.log("fetchheart");
      try {
        const response = await axios.post(`${Config.API_URL}/api/univ/heartfind`,
        {univname, email})
        console.log(response.data.heart.length)
        if(response.data.heart.length !=0){
          setIsLiked(true);
        }
        else {
          setIsLiked(false);
        }

      }
      catch(error){
        console.log(error)
      }
    }
    fetchdata();
    if (isLogin){
      fetchheart()
    }
  },[setrefresh])


  const [isLiked, setIsLiked] = useState(false);

  const handlePress = async() => {
    if (isLogin){
      const response = await axios.post(`${Config.API_URL}/api/univ/heartchange`, {
        univname,email
      })
      console.log(response.data.message)

      if (response.data.message == "delete") {
        setIsLiked(false);
        setheartcount(heartcount-1)
      }
      if (response.data.message == "insert") {
        setIsLiked(true);
        setheartcount(heartcount+1)
      }
        
      }
    else {
      Alert.alert("로그인 후 이용 가능한 기능입니다.")
      console.log("로그인 후 이용 가능한 기능입니다.")
    }
    // setIsLiked(!isLiked);
    setrefresh(refresh+1);
  };


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
        // source= {require(imageURL)}
      />
      <View style = {{marginBottom: 30, marginLeft: 30, flexDirection: 'row'}}>
      <TouchableOpacity onPress={handlePress}>
        {isLiked ? (
          <Icon name="heart" size={30} color="#f00" />
        ) : 
          (
          <Icon name="heart-o" size={30} color="#ccc" />
        )}
      </TouchableOpacity>
      <View style ={{marginLeft: 30, marginTop: 10 }}>
      <Text style = {{ fontFamily: 'BMHANNAPro' ,fontSize: 10}}>
        {heartcount} 명이 축제를 좋아합니다.
      </Text>
      </View>
    </View>
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
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {Alert.alert("맵")}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  지도
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
          onPress = {() => {
            route.navigation.navigate('Boothpage',{univinfo: univ})
           }}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  부스
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {route.navigation.navigate("Univdetail", {univinfo:univ})}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  학교정보
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
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
