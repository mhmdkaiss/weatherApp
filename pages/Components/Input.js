import React,{Component} from 'react';
import {TextInput, View, Text,StyleSheet,Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({iconName,iconColor,value,onChangeText,placeholder,secureTextEntry,keyboardType}) =>  {
  
  const {containerstyle,inputstyle,iconStyle}=styles;
  
        return (
        <View style={containerstyle}>
            <MaterialCommunityIcons style={iconStyle} name={iconName} color={iconColor} size={20}/>
            
            <TextInput 
            style={inputstyle}
            value={value}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            />
        </View>
    );
}

const styles= StyleSheet.create({
    containerstyle:{
        flexDirection:'row',
        height:(Dimensions.get('window').height*7)/100,
        width: (Dimensions.get('window').width*80)/100,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:10
    },
    iconStyle:{
        flex:1,
        paddingLeft:10,
    },
    inputstyle:{
        flex:8,
        fontSize:14,
    }
})

export default Input;

