/**
 * Author: Moses Adekunle Esan
 * Date: 8/5/16.
 * Project: React Native Authentication Views
 * Description: Registration Page
 */

import React, { Component } from 'react';
import {
    Text, Platform,
    View, Dimensions,
    TextInput, TouchableHighlight,
    LayoutAnimation, UIManager,
    Alert, StatusBar
} from 'react-native';

import { Router, Scene, Actions} from 'react-native-router-flux';
import LoginModel from '../../model/login-model.js';
import NavBar from '../navbar/navbar.js'

var {width: windowWidth, height:windowHeight} = Dimensions.get('window');
var _this;

export default class Registration extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: {name: "", email: "", password: "", password_confirmation: ""},
            error: {name: "", email: "", password: "", password_confirmation: ""},
        }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);
        if (Platform.OS === "ios") StatusBar.setBarStyle('default', true);
    }

    render() {
        _this = this;
        return (
            <View style={{position: "relative"}}>
                <View style={[styles.loginContainer]}>
                    <NavBar leftBtnImage={require('../../images/close.png')} leftBtn={() => Actions.pop()} rightBtn={null}/>
                    <View style={[styles.login]}>
                        <View style={[styles.header]}>
                            <Text style={[styles.headerText2, {paddingRight: 75 }]}>CREATE YOUR PROFILE</Text>
                        </View>
                        <View style={[styles.loginWrapper]}>
                            <View style={[styles.textInputContainer]}>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.data.name}
                                               placeholder={"Full Name"}
                                               onChangeText={(text) => this.onChangeText("name", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["name"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               value={this.state.data.email}
                                               placeholder={"Email Address"}
                                               onChangeText={(text) => this.onChangeText("email", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["email"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               secureTextEntry={true}
                                               value={this.state.data.password}
                                               placeholder={"Password"}
                                               onChangeText={(text) => this.onChangeText("password", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11}}>
                                    {_this.state.error["password"]}
                                </Text>
                                <View style={[styles.textInputWrapper]}>
                                    <TextInput style={[styles.textInput]}
                                               secureTextEntry={true}
                                               value={this.state.data.password_confirmation}
                                               placeholder={"Confirm Password"}
                                               onChangeText={(text) => this.onChangeText("password_confirmation", text)}
                                               autoFocus ={false}/>
                                </View>
                                <Text style={{color: "#d3222b", fontSize: 11, marginBottom: 20}}>
                                    {_this.state.error["password_confirmation"]}
                                </Text>

                            </View>
                        </View>
                        <TouchableHighlight onPress={this.register}
                                            underlayColor={"rgba(129, 29, 55, .8)"}
                                            style={[styles.logInButton, {width: windowWidth - 50, borderRadius: 2, position: "absolute", bottom: 15}]}>
                            <Text style={[styles.buttonText]}>SIGN UP</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            </View>
        );
    }

    onChangeText(key, value){
        var data = _this.state.data;
        data[key] = value;
        _this.setState({data: data})
    }


    register(){
        var data = _this.state.data;
        var error = {};
        var errCount = 0;

        if(data["name"].length === 0) {
            error["name"] = "Your name is required!";
            errCount++;
        }else error["name"] = "";

        if(data["password"] === data["password_confirmation"]) {
            if (data["password"].length < 6) {
                error["password"] = "Password should be Min 6 characters";
                errCount++;
            }else {
                error["password"] = "";
                error["password_confirmation"] = "";
            }
        }else{
            errCount++;
            error["password_confirmation"] = "The password does not match.";
        }

        if(data["email"].length === 0) {
            error["email"] = "Your email is required!";
            errCount++;
        }else error["email"] = "";

        _this.setState({error: error});

        if (errCount === 0){
            Alert.alert(
                'API Calls Disabled',
                "API calls have been disabled for this demo.",
                [
                    {text: 'Ok', style: 'cancel'}
                ]
            )

            //LoginModel.register(_this.state.data, function(success, message, error){
            //    if(success) {
            //        Alert.alert(
            //            'Registration Successful',
            //            message,
            //            [
            //                {
            //                    text: 'Continue', style: 'cancel', onPress: () => {
            //                        Actions.pop()
            //                    }
            //                },
            //            ]
            //        )
            //
            //    }else {
            //        _this.setState({error: JSON.parse(error)})
            //    }
            //});
        }
    }
}

const styles = require('../../styles/login');