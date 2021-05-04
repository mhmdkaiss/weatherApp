import React ,{Component} from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from '../utils/WeatherApiKey';
import auth from '@react-native-firebase/auth';

import {connect} from 'react-redux'

class WeatherPage extends Component {
	state = {
        isLoading: false,
        temperature: 0,
        weatherCondition: '',
        error: null,
        lat:0,
        lon:0,
	};

    componentWillMount() {
        Geolocation.getCurrentPosition(
			position => {
				this.setState({lat:position.coords.latitude,lon:position.coords.longitude})
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: false,
				timeout: 5000,
				maximumAge: 10000}
		);


	}

  
	fetchWeather(lat =25, lon=25 ) {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(json => {
                // console.log(json)
				this.setState({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					isLoading: false,
                    lat:json.coord.lat,
                    lon:json.coord.lon
				});
				this.props.setTemperature(json.main.temp)
				this.props.setWeatherCondition(json.weather[0].main)
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
				<Button title={'Log out'} onPress={()=>this.logout()}/>
				<View style={styles.headerContainer}>
					<Text style={styles.tempText}>{this.props.temperature}˚</Text>
					<TouchableOpacity style={{backgroundColor:'black'}} onPress={()=>this.navigateToCountries()}>
						<Text style={{fontSize:18,color:'white'}}>Choose Country other than your location</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.bodyContainer}>
				<Text style={styles.title}>Lat: {this.state.lat}</Text>
				<Text style={styles.title}>Lon: {this.state.lon}</Text>
					<Text style={styles.title}>{this.state.weatherCondition}</Text>
				</View>
				<Button title={'Share weather by email'} onPress={()=>this.shareWeather()}/>
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(WeatherPage);

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
		fontSize: 48,
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
		fontSize: 48,
		color: '#fff'
	},
	subtitle: {
		fontSize: 24,
		color: '#fff'
	}
});