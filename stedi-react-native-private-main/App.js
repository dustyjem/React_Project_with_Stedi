import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import  Navigation from './components/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { Button, TextInput } from 'react-native';
//Just a comment for push

const AppStack = createNativeStackNavigator();
const loggedInStates = {
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  LOGGED_IN: 'LOGGED_IN',
  CODE_SENT: 'CODE_SENT'
}

const App = () =>{
  const [isFirstLaunch, setFirstLaunch] = React.useState(true);
  const [loggedInState, setLoggedInState] = React.useState(loggedInStates.NOT_LOGGED_IN);
  const [homeTodayScore, setHomeTodayScore] = React.useState(0);
  const[phnoneNumber, setPhoneNumber] = React.useState('');
  const [oneTimePassword, setOneTimePassword] = React.useState(null)

   if (isFirstLaunch == true){
return(
  <OnboardingScreen setFirstLaunch={setFirstLaunch}/>
 
);
  }else if(loggedInState == loggedInStates.LOGGED_IN){
    return <Navigation/>
  } else if(loggedInState == loggedInStates.NOT_LOGGED_IN){
    return(<View>
            <Text style={{fontWeight:'bold', textAlign:'center', color:'#A0CE4E', fontSize:19, margin:12,  marginTop: -70}}>Your Privacy is safe with us!
              Please enter your phone number.</Text>
            <TextInput placeholder='Phone number'
             style={{fontWeight:'bold', 
                    textAlign:'center', 
                    color:'#5059c9',
                    height: 40,
                    margin: 12,
                    borderWidth: 2,
                    borderRadius: 5,
                    margin: 0,
                    marginTop: 100,
                    }}
                    value = {setPhoneNumber}
                    onChangeText = {setPhoneNumber}>
              </TextInput>
            <Button title='Send'
                    style={{fontWeight:'bold', textAlign:'center', color:'#A0CE4E', fontSize:19, margin:12,  marginTop: 400, backgroundColor:'black', margin: 12,
                        borderWidth: 2,
                       borderRadius: 5,}}
                    onPress = {async()=>{
                    console.log('This Button was pressed!');
                    var the_url = await fetch("https://dev.stedi.me/twofactorlogin/" + phnoneNumber,
                    {
                      method: 'POST',
                      headers:{
                        'content-type': 'application/text'
                      }

                    })
                    setLoggedInState(loggedInStates.CODE_SENT)
                    }}>
                    </Button>
              </View>
              )}
              else if(loggedInStates == loggedInStates.CODE_SENT){
                return(
                  <View>
                    <TextInput placeholder='One Time Password'
             style={{fontWeight:'bold', 
                    textAlign:'center', 
                    color:'#5059c9',
                    height: 40,
                    margin: 12,
                    borderWidth: 2,
                    borderRadius: 5,
                    margin: 0,
                    marginTop: 100,
                    }}
                    value = {oneTimePassword}
                    onChangeText = {setOneTimePassword}
                    keyboardType = "numeric">
              </TextInput>
              <Button title='Login'
                    style={{fontWeight:'bold', textAlign:'center', color:'#A0CE4E', fontSize:19, margin:12,  marginTop: 400, backgroundColor:'black', margin: 12,
                        borderWidth: 2,
                       borderRadius: 5,}}
                    onPress = {async()=>{
                    console.log('Login Button was pressed!');
                    var the_url = await fetch("https://dev.stedi.me/twofactorlogin",
                    {
                      method: 'POST', 
                      headers:{
                        'content-type': 'application/text'
                      }
                      // body:

                    })
                    setLoggedInState(loggedInStates.CODE_SENT)
                    }}>
                    </Button>
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