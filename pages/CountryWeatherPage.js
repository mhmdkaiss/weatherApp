import React ,{Component} from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from '../utils/WeatherApiKey';
import auth from '@react-native-firebase/auth';

import {connect} from 'react-redux'

class CountryWeatherPage extends Component {
	state = {
        isLoading: false,
        temp: 0,
        weatherCondition: '',
        error: null,
        lat:0,
        lon:0,
        countryName:this.props.route.params.countryname,
	};

    componentWillMount() {
       console.log(this.state.countryName)
        
      
		fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${this.state.countryName}&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "d19c51494dmsh2f543011a8e1151p123e8djsnebbabdbd5c69",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        }).then(res => res.json())
        .then(json => {
            this.setState({temp:json.list[0].main.temp-273.15})
            this.setState({weatherCondition:json.list[0].weather[0].main})
            this.setState({lat:json.list[0].coord.lat})
            this.setState({lon:json.list[0].coord.lon})
        })
        .catch(err => {
            console.error(err);
        });
			
	}  


	logout(){
		auth().signOut();
		this.props.navigation.navigate('SignInPage');
	  }

	  shareWeather(){
		this.props.navigation.navigate('SendEmailPage');
	  }

	  navigateToCountries(){
		this.props.navigation.navigate('CountriesPage');
	  }

	render(){
        return (
			<View style={styles.weatherContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.tempText}>{this.state.temp}˚</Text>
					<Text style={styles.tempText}>{this.state.countryName}</Text>
				</View>
				<View style={styles.bodyContainer}>
                    <Text style={styles.title}>Lat: {this.state.lat}</Text>
                    <Text style={styles.title}>Lon: {this.state.lon}</Text>
					<Text style={styles.title}>{this.state.weatherCondition}</Text>
				</View>
			</View>
		);
    }
		
	
}

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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CountryWeatherPage);

const styles = StyleSheet.create({
	weatherContainer: {
		flex: 1,
		backgroundColor: '#f7b733'
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tempText: {
		fontSize: 30,
		color: '#fff'
	},
	bodyContainer: {
		flex: 2,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		paddingLeft: 25,
		marginBottom: 40
	},
	title: {
		fontSize: 30,
		color: '#fff'
	},
	subtitle: {
		fontSize: 24,
		color: '#fff'
	}
});