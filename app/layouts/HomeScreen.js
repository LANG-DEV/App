/**
 * @flow
 */

import React from 'react';
import {
    Text, Button, KeyboardAvoidingView, View, StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text>This is the home page.</Text>
                <Button style={styles.loginButtonContainer}
                    onPress={() => this.props.navigation.navigate('Login')}
                    title='Log in'/>

            </KeyboardAvoidingView>
            );
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#3498db'
        },
        loginButtonContainer: {
            backgroundColor: '#2980b9',
            flexGrow: 1
        }
    });
