import React from 'react';
import {
    Container,Image,KeyboardAvoidingView,
    StyleSheet,Text,TextInput,TouchableOpacity,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/logo_placeholder.png')} />
          <Text style={styles.title}>
            浪！
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            onChangeText={(text) => this.setState({text})}/>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({text})}/>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3498db',
    flex: 1
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF'
  },
  logo: {
    height: 100,
    width: 100
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  formContainer: {
    padding: 20
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFF',
    height: 40,
    padding: 10,
    margin: 10,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 10,
    marginLeft: 30,
    textAlign: 'center'
  }
});
