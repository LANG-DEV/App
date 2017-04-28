/**
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import Router from './routes/router'

export default class App extends Component {
    render() {
        return <Router />;
    }
}

AppRegistry.registerComponent('App', () => App);
