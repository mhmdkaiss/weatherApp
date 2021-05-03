import React from 'react';
import { View, Text ,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Input from './Components/Input'
import auth from '@react-native-firebase/auth';

class SignUpPage extends React.Component{

    state = {email:'mohamad@hotmail.com',password:'12345678',error:'',loading:false}

    SignUpButton(){
        const {email,password} = this.state;
      
        auth().createUserWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=>{
          this.setState({error:'Error!',loading:false})
        })
        
    }

    async onLoginSuccess(){
      this.props.navigation.navigate('WeatherPage');
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
            iconName={'lock'}
            placeholder={'Password'}
            value={this.state.password}
            onChangeText={text=>this.setState({password:text})}
            />

            <View style={{height:( Dimensions.get('window').height*3)/100}}/>

            <View style={styles.textContainer}>
            <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.props.navigation.navigate('SignInPage')}>
            <Text style={styles.SignUpTextStyle}>Sign In</Text>
            </TouchableOpacity>
            </View>

            <View style={{height:( Dimensions.get('window').height*2)/100}}/>

        {this.state.error?<Text style={styles.errorTextStyle}>{this.state.error}</Text>:null}

            <TouchableOpacity style={styles.SignInButton} onPress={()=>this.SignUpButton()}>
            <Text style={styles.textStyle}>Sign Up</Text>
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

export default SignUpPage;