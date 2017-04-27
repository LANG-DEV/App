import React from 'react';
import {
    AppRegistry,
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <ScrollView>
        <Text>Login</Text>
        <TextInput placeholder="Enter Username" />
        <TextInput secureTextEntry={true}, placeholder="Enter Password" />
        <Button title="Submit"/>
      </ScrollView>
    )
  }
}
