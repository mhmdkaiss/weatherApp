


import React from 'react';
import { View, Text ,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Input from './Components/Input'

import {API_KEY} from '../utils/WeatherApiKey'

import {connect} from 'react-redux'

class CountriesPage extends React.Component{

    state = {country:'beirut',temp:0}


    getCityWeatherBtn(){
        const {country} = this.state;
    
        fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${this.state.country}&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "d19c51494dmsh2f543011a8e1151p123e8djsnebbabdbd5c69",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        }).then(res => res.json())
        .then(json => {
            this.setState({temp:json.list[0].main.temp-273.15})
            console.log(json.list[0].main.temp-273.15)
        })
        .catch(err => {
            console.error(err);
        });
    }

    render(){
        return (
            <View  style={styles.weatherContainer}>
            <Text style={{alignSelf:'center',fontSize:35}}>{this.state.temp}˚</Text>
            <View style={styles.CenterContainer}>
         
            <Input 
            placeholder={'Enter Country'}
            value={this.state.country}
            onChangeText={text=>this.setState({country:text})}
            />

            <View style={{height:( Dimensions.get('window').height*5)/100}}/>


            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.getCityWeatherBtn()}>
            <Text style={styles.textStyle}>Choose Country</Text>
            </TouchableOpacity>

            <View style={{height:( Dimensions.get('window').height*5)/100}}/>

            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.sendEmailBtn()}>
            <Text style={styles.textStyle}>Save Country</Text>
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
      width:( Dimensions.get('window').width*40)/100,
      height:( Dimensions.get('window').height*5)/100,
      alignItems:'center'
    }
    ,
    textStyle:{
        color:'black',
        fontSize:19,
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CountriesPage);