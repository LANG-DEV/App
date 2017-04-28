import React from 'react';
import {
    Container,Button,Image,KeyboardAvoidingView,
    StyleSheet,Text,TextInput,TouchableOpacity,View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  // constructor(props) {
  //   super(props);
  //
  //   this.keyboardHeight = new Animated.Value(0);
  //   this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  // }

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        //enableAutoAutomaticScroll={false}
        extraScrollHeight={120}
        scrollEnabled={false}
        style={{backgroundColor: '#3498db'}}>

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
            returnKeyType="next"
            style={styles.input}
            placeholder="Enter Username"
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={() => this.passwordInput.focus()}/>
          <TextInput
            ref={(input) => this.passwordInput = input}
            returnKeyType="go"
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({text})}/>
          <TouchableOpacity style={styles.buttonContainer}>
            <Button title="LOGIN" style={styles.buttonText} />
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#3498db',
    flex: 1,
    padding: 20,
    justifyContent: 'space-between'
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
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
    justifyContent: 'flex-end',
    padding: 20,
    //paddingBottom: 40
    //margin: 30
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFF',
    height: 40,
    padding: 10,
    marginVertical: 10,
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
