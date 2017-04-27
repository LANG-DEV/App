import React from 'react';
import {Text, View} from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    render() {
        return (
            <View>
                <Text>This is the login page.</Text>
            </View>
        );
    }
}
