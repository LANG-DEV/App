import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <form>
        Username: <input type="text", placeholder="Enter Username", name="username"/>
        Password: <input type="password", placeholder="Enter Password", name="passwd"/>
        <button type="submit">Login</button>
      </form>
    )
  }
}
