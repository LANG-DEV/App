import React from 'react';
import {
    Animated,Container,Button,Image,KeyboardAvoidingView,
    StyleSheet,Text,TextInput,TouchableOpacity,View,Keyboard
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import auth from '../lib/auth';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.imageHeight = new Animated.Value(200);
    }

    attemptLogin = (res) => {
        console.log("res: " + JSON.stringify(res));
        if (res.success) {
            MessageBarManager.showAlert({
                title: 'Login successful!',
                message: res.body,
                alertType: 'info',
                durationToShow: 0,
            });
        } else {
            MessageBarManager.showAlert({
                title: 'Oops...',
                message: res.body,
                alertType: 'error',
                durationToShow: 0,
                stylesheetError: {
                    backgroundColor: 'rgba(231, 76, 60, 1)'
                }
            });
        }
    }

    onLoginButtonPressed = () => {
        auth.login(this.state.username, this.state.password, this.attemptLogin);
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();

        MessageBarManager.unregisterMessageBar();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 50,
        }).start();
    };

    keyboardWillHide = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 200,
        }).start();
    };

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>

                <MessageBar ref='alert' />

                <View style={styles.logoContainer}>
                    <Animated.Image
                        style={[styles.logo, { height: this.imageHeight }]}
                        source={require('../images/logo_placeholder.png')} />
                        <Text style={styles.title}>
                            浪！
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType="next"
                            style={styles.input}
                            placeholder="Enter Username"
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={() => this.passwordInput.focus()}/>
                            <TextInput
                                ref={(input) => this.passwordInput = input}
                                returnKeyType="go"
                                style={styles.input}
                                placeholder="Enter Password"
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({password: text})}/>
                                <TouchableOpacity
                                    onPress={this.onLoginButtonPressed}
                                    style={styles.buttonContainer}>
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
                    flex: 1,
                    padding: 20,
                    justifyContent: 'flex-start'
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
                    height: 200,
                    width: 200,
                    //flex: 1,
                    resizeMode: 'contain'
                },
                logoContainer: {
                    alignItems: 'center',
                    flex: 1,
                    flexGrow: 1,
                    justifyContent: 'center',
                },
                formContainer: {
                    justifyContent: 'flex-start',
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
