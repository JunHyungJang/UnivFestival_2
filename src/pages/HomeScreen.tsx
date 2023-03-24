import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Config from 'react-native-config';

function HomeScreen({navigation}: any) {
  
  const [viewCount, setViewCount] = useState(5);
  const isLogin = useSelector((state: RootState) => !!state.user.email);
  const univ = useSelector((state:RootState) => state.user.univ)

  const [univname,setunivname] = useState("");
  const [location,setlocation] = useState("");
  const [time,settime] = useState("");
  const [celeb,setceleb] = useState([]);




  const [recommendcount, setrecommendcount] = useState([]);
  const [recommendfest, setrecommendfest] = useState([]);
  useEffect(()=> {
    if(isLogin) {
      const fetchdata = async() => {
        try {
          const response = await axios.post(`${Config.API_URL}/api/univ/search`, {
            univ,
          });
          console.log('homescreen')
          console.log(response.data.result)
          setunivname(response.data.result.name);
          setlocation(response.data.result.location)
          settime(response.data.result.time)
          setceleb(response.data.result.celeb);
        }
        catch(error) {
          console.log(error)
        }
      }
      fetchdata()
    }
    const fetchredata = async() => {
      try {
        const response = await axios.get(`${Config.API_URL}/api/univ/popularfestival`)
        console.log("hello")
        console.log(response.data.univarray);
        setrecommendfest(response.data.univarray);
        setrecommendcount(response.data.univheart);
      }
      catch(error) {
        console.log(error)
      }
    }
    fetchredata();
  },[])

  const celeblist = celeb.map((k : string, idx: any)  => {
  
    let content = k;
    if (idx !== (celeb.length)-1) {
      content += ", "
    } 
    return(
      <View key = {idx}>
        <Text style = {{ fontFamily: 'BMHANNAPro',fontSize: 15  }}>{content}</Text>
      </View>
      )
  })

  const set1 = ['대학이름', '장소     ', '일시     ']
  const set2 = [univname,location,time];
  return (
    <ScrollView >
      <View >
        
        <ImageBackground
          source={require('../../assets/feimage.jpg')}
          style = {{width: '100%', height: 300}}
          blurRadius={10}
          >
          <View style = {{flex : 1,flexDirection: 'column', zIndex: 2}}>
          <Text style = {{fontSize: 50,fontFamily: 'BMHANNAPro',marginLeft: 10, color: 'white'}}>대학축제</Text>
          <Text style = {{fontSize: 30 ,fontFamily: 'BMHANNAPro', marginLeft: 10, color: 'white'}}>Everything about univ festival</Text>
          
          
          </View>
          
        </ImageBackground>
        </View>
          <View style = {{flex:2, flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 300, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {navigation.navigate('SearchFestival')}}>
                <Text style= {{fontFamily: 'BMHANNAPro', fontSize: 30}}>
                  축제 검색하기
                  </Text>
          </TouchableOpacity>
         
              
          </View>

          <Text style= {{marginLeft: 10,fontFamily: 'BMHANNAPro', fontSize: 20}}>
            
            추천하는 축제
          </Text>
          <ScrollView horizontal style = {{ marginTop: 10}}>
          {[...Array(viewCount)].map((item,index) =>(
            <TouchableOpacity onPress={()=> {
              const fetchdata = async() => {
                const response = await axios.post(`${Config.API_URL}/api/univ/search`, {
                  univ: recommendfest[index],
                });
                navigation.navigate('UnivInfo', {univinfo: response.data.result});
  
              }
              fetchdata();
  
            }
           } key = {index} >
              <View style = {{width: 120, height: 240, backgroundColor: 'white', marginLeft:10, alignItems: 'center', borderWidth: 1}}>
               <Text style = {{color: 'black', fontFamily: 'BMHANNAPro', fontSize: 14, marginTop: 20}} numberOfLines={1}
             >
                 {recommendfest[index]}
              </Text>
              <View style = {{flexDirection: 'row', marginTop: 50}}>
              <Icon name="heart" size={30} color="#f00" />
              <Text style = {{fontFamily:'BMHANNAPro', fontSize: 20, marginLeft: 10, marginTop: 5}}>
                {recommendcount[index]}
              </Text>
              </View>
              </View>
            </TouchableOpacity>
           
          ))}
          </ScrollView>
          <Text style= {{marginLeft: 10,fontFamily: 'BMHANNAPro', fontSize: 20}}>
            우리학교 축제
          </Text>
         
         {!isLogin ? (
            <View style = {{flex:1, borderWidth: 2,marginLeft: 10, marginBottom: 40, height: 200, justifyContent:'center', alignItems: 'center'}}>
            <Text style = {{color: "black", fontFamily: 'BMHANNAPro'}}>
                회원가입을 하고 학교를 등록해주세요!
            </Text>
          </View>
         ) : (
          <TouchableOpacity onPress={()=> {
            const fetchdata = async() => {
              const response = await axios.post(`${Config.API_URL}/api/univ/search`, {
                univ,
              });
              navigation.navigate('UnivInfo', {univinfo: response.data.result});

            }
            fetchdata();

          }
         } >
          <View style = {{flex:1, height: 200, borderWidth: 2,marginLeft: 10, marginBottom: 40, justifyContent: 'center', backgroundColor: 'pink'}}>
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
      </View>
      </TouchableOpacity>
         )}
    </ScrollView>
  );
}

export default HomeScreen;
