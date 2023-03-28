import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView, 
  TextInput,
  TouchableHighlight,
  FlatList,
  Pressable,
  TouchableOpacity
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Button} from '@rneui/themed';

// import {SearchBar} from '@rneui/themed';
import SearchBar from 'react-native-search-bar'
import axios from 'axios';
import Config from 'react-native-config';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Search from '../components/Searach';
import Icon from 'react-native-vector-icons/MaterialIcons';


function SearchFestival({navigation}: any) {
  const [search, setsearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setdata] = useState([])

  
  const updateSearch = (search: string) => {
    setsearch(search);
    getname(search)
    console.log(search)
    
  };

  const getuniv = useCallback(async (univ: any) => {
    console.log("getuni", univ)
    try {
      const response = await axios.post(`${Config.API_URL}/api/univ/search`, {
        univ,
      });
     
      if (response.data.success == false) {
        console.log(response.data.message);
        Alert.alert('해당 대학이 존재하지 않습니다.');
      } else if (response.data.success == true) {
        console.log(response.data.result)
        navigation.navigate('UnivInfo', {univinfo: response.data.result});
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <View style = {{display: 'flex', flexDirection: 'row'}} >
       <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss}>
        <SafeAreaView style = {{flex : 1}}>
            <TextInput
            placeholder='입력해주세요'
            onChangeText={updateSearch}
            onSubmitEditing = {()=> getuniv(search)}
            style ={{
                height: 40,
                marginHorizontal: 12,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
            }} />
           <FlatList
           data = {data}
           renderItem = {({item,index}) => (
            <Pressable onPress={()=> getuniv(item)}>
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
    <TouchableOpacity activeOpacity={0.2} 
    style = {{width:100, height: 40, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', borderRadius: 20}} onPress = {() =>getuniv(search) }>
    <Text style = {{fontFamily: 'BMHANNAPro'}}>
      검색하기
    </Text>
    </TouchableOpacity>
 
    </View>
  );
}

export default SearchFestival;
