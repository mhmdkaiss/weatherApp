


import React from 'react';
import { View, Text ,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Input from './Components/Input'
import {sendEmail} from './sendEmail'

class SendEmailPage extends React.Component{

    state = {email:'mohamad@hotmail.com',subject:'test subject',body:'here body of email'}

    sendEmailBtn(){
        const {email,subject,body} = this.state;
      console.log('send email')
        sendEmail(
            `${email}`,
               `${subject}`,
            `${body}`
        ).then(() => {
            console.log('Your message was successfully sent!');
        });
    }

    render(){
        return (
            <View  style={styles.weatherContainer}>
            <View style={styles.CenterContainer}>
            <Input 
            iconName={'account'}
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={text=>this.setState({email:text})}
            />

            <View style={{height:( Dimensions.get('window').height*5)/100}}/>

            <Input 
            iconName={''}
            placeholder={'Subject'}
            value={this.state.subject}
            onChangeText={text=>this.setState({subject:text})}
            />

            <View style={{height:( Dimensions.get('window').height*5)/100}}/>

            <Input 
            iconName={''}
            placeholder={'Body'}
            value={this.state.body}
            onChangeText={text=>this.setState({body:text})}
            />

            <View style={{height:( Dimensions.get('window').height*5)/100}}/>

            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.sendEmailBtn()}>
            <Text style={styles.textStyle}>Send email</Text>
            </TouchableOpacity>
        </View>
        </View>
        );    
    }
};

const styles = StyleSheet.create({
	weatherContainer: {
		flex:1,
        justifyContent:'center',
		backgroundColor: '#f7b733',  
	}
    ,
    CenterContainer:{
        alignItems:'center',
        alignSelf:'center',
        // justifyContent:'center',
        backgroundColor:'grey',
        padding:  ( Dimensions.get('window').width*5)/100,  
        borderRadius:15,
        opacity:0.9
    }
    ,
    textContainer:{
      flexDirection:'row',
      width:( Dimensions.get('window').width*80)/100,
    }
    ,
    SignUpTextStyle:{
      color:'white',
      fontSize:20
    }
    // ,
    // FrogetPassTextStyle:{
    //   color:'white',
    //   fontSize:16
    // }
    ,
    SignInButton:{
      backgroundColor:'white',
      borderRadius:10,
      width:( Dimensions.get('window').width*30)/100,
      height:( Dimensions.get('window').height*5)/100,
      alignItems:'center'
    }
    ,
    textStyle:{
        color:'black',
        fontSize:19,
        fontWeight:'bold',  
    }
    ,
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red',
    marginBottom:5
  }
});

export default SendEmailPage;