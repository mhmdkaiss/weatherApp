import React from 'react';
import WeatherPage from './pages/weatherPage'
import SignInPage from './pages/SignIn'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpPage from './pages/SignUp';
import auth from '@react-native-firebase/auth';
import SendEmailPage from './pages/sendEmailPage'

import { Provider } from 'react-redux'
import Reducer from './pages/reducers/reducer'
import {createStore} from 'redux'
import CountriesPage from './pages/CountriesPage';

const store = createStore(Reducer);

const HomeStack = createStackNavigator();


function UserNotSignedIn() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="SignInPage" component={SignInPage} options={{headerShown: false}} />
        <HomeStack.Screen name="SignUpPage" component={SignUpPage} options={{headerShown: false}} />
        <HomeStack.Screen name="WeatherPage" component={WeatherPage} options={{headerShown: false}} />
     </HomeStack.Navigator>
  );
}

function UserSignedIn() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen name="WeatherPage" component={WeatherPage} options={{headerShown: false}} />
        <HomeStack.Screen name="SignInPage" component={SignInPage} options={{headerShown: false}} />
        <HomeStack.Screen name="SignUpPage" component={SignUpPage} options={{headerShown: false}} />
        <HomeStack.Screen name="SendEmailPage" component={SendEmailPage} options={{headerShown: ' '}} />
        <HomeStack.Screen name="CountriesPage" component={CountriesPage} options={{headerShown: ' '}} />
        
    </HomeStack.Navigator>
  );
}

class App extends React.Component{

  state={loggedIn:false};

  componentWillMount(){
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true});
      } else {
        this.setState({loggedIn:false});
      }
    })
  }

renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
          <UserSignedIn/>
        );
      case false :
        return (
          <UserNotSignedIn/>
        );
  }
}

render(){
  return (
    <Provider store={store}>
      <NavigationContainer>
        {this.renderContent()}
      </NavigationContainer>
    </Provider>
  );
}

 
};

export default App;
