import {StyleSheet} from 'react-native'
import {Text,View,SafeAreaView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'


export default function TabtoScreen() {
    const [input,setinput] = useState<String>();
    const onChangeText = (text:string) => {
        setinput(text)
        console.log("get data")
    }
    return 
    <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss}>
        <SafeAreaView style = {{flex : 1}}>
            <Text style = {{marginLeft: 12, marginVertical: 5, fontSize: 12}}>Search Location</Text>
            <TextInput
            placeholder='Find Location'
            onChangeText={onChangeText}
            style ={{
                height: 40,
                marginHorizontal: 12,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 5,
            }} />
        </SafeAreaView>
    </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({})