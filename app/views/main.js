/**
 * Author: Moses Adekunle Esan
 * Date: 8/2/16.
 * Project: React Native Authentication Views
 */

import React, { Component } from 'react';
import { PanResponder} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './home.js'
import Welcome from './registration-login/welcome.js'
import Login from './registration-login/login.js'
import Register from './registration-login/register.js'
import Password from './registration-login/password.js'
import Verify from './registration-login/verify.js'
import VerificationCode from './registration-login/verification_code.js'
import LogOut from './registration-login/logout.js'

const navigationBarStyle = {
    backgroundColor: '#CB1B22',
    overflow: "hidden",
    position: "absolute",
    top: 0, left: 0, right: 0
};

const titleStyle = {
    color: "#FFFFFF",
    fontWeight:"500",
    fontSize: 17, textAlign:"center",
};

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" navigationBarStyle={navigationBarStyle} titleStyle={titleStyle}
                       backButtonImage={require('../../images/back.png')}>
                    <Scene key="home" component={Home} title="Home" initial={true}/>

                    <Scene key="login" hideNavBar={true} direction="vertical"  title="Login" >
                        <Scene key="welcome" component={Welcome} title="Welcome"
                               initial={true} onLogin={this.props.onLogin}
                               schema="modal" panHandlers={null}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="Password" component={Password} title="Password"/>
                        <Scene key="Register" component={Register} title="Register"/>
                        <Scene key="Verify" component={Verify} title="Verify"/>
                        <Scene key="VerificationCode" component={VerificationCode} title="VerificationCode"/>
                    </Scene>
                    <Scene key="logout" component={LogOut} title="LogOut"direction="vertical" schema="modal" hideNavBar={true}/>
                </Scene>
            </Router>
        )
    }
}
