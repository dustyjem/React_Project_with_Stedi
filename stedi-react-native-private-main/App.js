import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
//Just a comment for push



const AppStack = createNativeStackNavigator();

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(isLoggedIn){
    return <Navigation/>
  } else{
    return( <View>
      <Text style={{fontWeight:'bold', textAlign:'center', color:'#A0CE4E', fontSize:19, margin:12,  marginTop: -70}}>Your Privacy is safe with us!
      Please enter your phone number.</Text>
      <TextInput placeholder='Phone number' style={{fontWeight:'bold', 
      textAlign:'center', 
      color:'#5059c9',
      height: 40,
      margin: 12,
      borderWidth: 2,
      borderRadius: 5,
      margin: 0,
      marginTop: 100,
      }
      }></TextInput>
      <Button title='Send'
      style={StyleSheet.Button}
      onPress = {()=>{
        console.log('This Button was pressed!');
      }}></Button>
    </View>
    )
  }
}
 export default App;

//Where we are

const styles = StyleSheet.create({
  container:{
      flex:1, 
      alignItems:'center',
      justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100
  },
  Button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }    
})