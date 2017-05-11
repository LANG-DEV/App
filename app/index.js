/**
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from './layouts/HomeScreen';
import LoginScreen from './layouts/LoginScreen';
import SignupScreen from './layouts/SignupScreen';

export default class App extends Component {
    render() {
        return (
            <Router hideNavBar= "true">
                <Scene key="root">
                    <Scene key="home" component={HomeScreen} title="Home" initial={true} />
                    <Scene key="login" component={LoginScreen} title="Log in" />
                    <Scene key="signup" component={SignupScreen} hideNavBar={false} title="Sign up" />
                </Scene>
            </Router>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
