


import React from 'react';
import { View, Text ,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Input from './Components/Input'
import {sendEmail} from './sendEmail'

import {connect} from 'react-redux'

class SendEmailPage extends React.Component{

    state = {email:'mohamad@hotmail.com',subject:'test subject',body:`Temperature :${this.props.temperature} Weather Condition:${this.props.weatherCondition} `}

  componentDidMount(){
    
	
  }

    sendEmailBtn(){
        const {email,subject,body} = this.state;
     
        sendEmail(
            `${email}`,
               `${subject}`,
            `Temperature :${this.props.temperature} Weather Condition:${this.props.weatherCondition} ${body}`
        ).then(() => {
            console.log('Your message was successfully sent!');
        });
    }

    render(){
        return (
            <View  style={styles.weatherContainer}>
            <View style={styles.CenterContainer}>
            <Text style={styles.textStyle}>Temperature : {this.props.temperature}</Text>
            <Text style={styles.textStyle}>Weather Condition : {this.props.weatherCondition}</Text>

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>
            <Text>To:</Text>
            <Input 
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={text=>this.setState({email:text})}
            />

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>

            <Text>Subject:</Text>
            <Input 
            placeholder={'Subject'}
            value={this.state.subject}
            onChangeText={text=>this.setState({subject:text})}
            />

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>

            <Text>Body:</Text>
            <Input 
            placeholder={'Body'}
            value={this.state.body}
            onChangeText={text=>this.setState({body:text})}
            />

            <View style={{height:( Dimensions.get('window').height*3)/100}}/>

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


function mapStateToProps (state) {
	return {
	  temperature : state.temperature,
	  weatherCondition: state.weatherCondition,
	}
  }
  
  function mapDispatchToProps(dispatch){
    return{
      setTemperature :(temp) => dispatch({type:'setTemperature',payload:temp}),
      setWeatherCondition : (weatherCond) => dispatch({type:'setWeatherCondition', payload:weatherCond}),
    }
    }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SendEmailPage);