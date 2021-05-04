


import React from 'react';
import { View, Text ,StyleSheet,Dimensions,TouchableOpacity, FlatList} from 'react-native';
import Input from './Components/Input'

import {connect} from 'react-redux'

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class CountriesPage extends React.Component{

    state = {country:'beirut',temp:0,countries:[]}

    componentDidMount(){
      // console.log(auth().currentUser.email)
      firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        const usersArray=[]
        querySnapshot.forEach(documentSnapshot => {
          usersArray.push(documentSnapshot.data())
        });
        // console.log( usersArray);
        for(const i in usersArray){
          if(usersArray[i].email == auth().currentUser.email){
            
           firestore()
            .collection('Users')
            .doc(usersArray[i].id)
            .onSnapshot(documentSnapshot => {
              this.setState({countries:documentSnapshot.data().countries})
            });
          }
        }
      });
      
    }


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
        })
        .catch(err => {
            console.error(err);
        });
    }

    addCountry(){
     var {countries,country}= this.state
     
      countries.push(country);
      
      firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        const usersArray=[]
        querySnapshot.forEach(documentSnapshot => {
          usersArray.push(documentSnapshot.data())
        });
        // console.log( usersArray);
        for(const i in usersArray){
          if(usersArray[i].email == auth().currentUser.email){
           
           firestore()
            .collection('Users')
            .doc(usersArray[i].id)
            .update({
              countries: this.state.countries,
            })
          }
        }
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

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>


            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.getCityWeatherBtn()}>
            <Text style={styles.textStyle}>Get Weather</Text>
            </TouchableOpacity>

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>

            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.addCountry()}>
            <Text style={styles.textStyle}>Save Country</Text>
            </TouchableOpacity>
        </View>

        <View style={{height:( Dimensions.get('window').height*2)/100}}/>
        
        <FlatList
          data={this.state.countries}
         
          ItemSeparatorComponent={()=>(<View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#C8C8C8",
          }}
        />)}

          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              // key={item.key}
              // onPress={() => console.log()}
              >
              <View style={{ backgroundColor: 'white' }}>
                <Text>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        </View>
        );    
    }
};

const styles = StyleSheet.create({
	weatherContainer: {
		flex:1,
        // justifyContent:'center',
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