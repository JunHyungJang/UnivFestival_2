import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Button, Icon} from '@rneui/themed';

function HomeScreen({navigation}: any) {
  
  const [viewCount, setViewCount] = useState(5);
  
  return (
    <ScrollView >
      <View >
        <View style ={{}}>
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
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {navigation.navigate('SearchFestival')}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  축제찾기
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {navigation.navigate('SearchFestival')}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  축제찾기
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {navigation.navigate('SearchFestival')}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  축제찾기
                  </Text>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={0.3} style = {{backgroundColor: 'rgba(141, 216, 239, 1)', borderRadius: 20, width: 85, height: 85, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}  
            onPress={() => {navigation.navigate('SearchFestival')}}>
                <Text style= {{fontFamily: 'BMHANNAPro'}}>
                  축제찾기
                  </Text>
          </TouchableOpacity>
              
          </View>

          <Text style= {{marginLeft: 10,fontFamily: 'BMHANNAPro', fontSize: 20}}>
            추천하는 축제
          </Text>
          <ScrollView horizontal style = {{ marginTop: 10}}>
          {[...Array(viewCount)].map((_,index) =>(
            <View key = {index} style = {{width: 120, height: 240, backgroundColor: 'blue', marginLeft:10}}>
              <Text style = {{color: 'white'}}>
                Item {index}
              </Text>
            </View>
          ))}
          </ScrollView>
          <Text style= {{marginLeft: 10,fontFamily: 'BMHANNAPro', fontSize: 20}}>
            우리학교 축제
          </Text>
          <View style = {{justifyContent: 'space-around',alignItems: 'center' , width: 300, height: 200, borderWidth: 2,marginLeft: 10, marginBottom: 40}}>
            <Text style = {{color: "black", fontFamily: 'BMHANNAPro'}}>
                회원가입을 하고 학교를 등록해주세요!
            </Text>
          </View>
          <View style = {{justifyContent: 'space-around',alignItems: 'center' , width: 300, height: 200, borderWidth: 2,marginLeft: 10, marginBottom: 40}}>
            <Text style = {{color: "black", fontFamily: 'BMHANNAPro'}}>
                
            </Text>
          </View>
          </View>
    </ScrollView>
  );
}

export default HomeScreen;
