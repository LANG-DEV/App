import React from 'react';
import {
    Animated, Container, Image, KeyboardAvoidingView, StyleSheet, Text,
    TextInput, TouchableHighlight, View, Keyboard, Platform, StatusBar
} from 'react-native';

import { Grid, Col, Button, Icon } from 'native-base';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import Dimensions from 'Dimensions'

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
            keyboardOn: false,
        };

        this.keyboardOn = false;
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
                    backgroundColor: 'rgba(200, 76, 60, 1)'
                }
            });
        }
    }

    onLoginButtonPressed = () => {
        Keyboard.dismiss();
        auth.login(this.state.username, this.state.password, this.attemptLogin);
    }

    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            this.keyboardWillShow
        );

        this.keyboardWillHideSub = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            this.keyboardWillHide
        );
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
        this.setState({keyboardOn: true});

        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 150,
        }).start();
    };

    keyboardWillHide = (event) => {
        this.setState({keyboardOn: false});

        Animated.timing(this.imageHeight, {
            duration: Platform.OS === 'ios' ? event.duration : 300,
            toValue: 200,
        }).start();
    };

    render() {
        return (
            <Image
                style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    width: undefined,
                    height: undefined,
                }}
                source={require('../images/bg5.jpg')}
                resizeMode='cover'>

                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                    keyboardVerticalOffset={Platform.OS === 'android' ? -700 : 0}>
                    <StatusBar
                        backgroundColor='rgba(255,255,255,0)'//'#1685ce'//'#639ea0'//'#1f74ad'
                        translucent={true}
                        barStyle="light-content"
                    />
                    <View style={styles.logoContainer}>
                        <Animated.Image
                            style={[
                                styles.logo,
                                { height: this.imageHeight },
                                ( Platform.OS === 'android' && this.state.keyboardOn ) ?
                                { display: 'none' } : null
                            ]}
                            source={require('../images/logo_placeholder.png')} />
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType="next"
                            style={styles.input}
                            placeholder="Enter Username"
                            onFocus={() => {
                                if (Platform.OS === 'android')
                                this.setState({keyboardOn: true})
                            }}
                            onChangeText={(text) => this.setState({username: text})}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            underlineColorAndroid='transparent' />
                        <TextInput
                            ref={(input) => this.passwordInput = input}
                            returnKeyType="go"
                            style={styles.input}
                            placeholder="Enter Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})}
                            onFocus={() => {
                                if (Platform.OS === 'android')
                                this.setState({keyboardOn: true})
                            }}
                            underlineColorAndroid='transparent' />
                        {/* <TouchableOpacity
                                        style={styles.buttonContainer}
                                        onPress={this.onLoginButtonPressed}>
                                        <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity> */}
                        <Grid>
                            <Col size={2.5}>
                                <Button block primary iconLeft
                                    onPress={this.onLoginButtonPressed}
                                    style={StyleSheet.flatten(styles.loginButton)}>
                                    <Icon name='log-in' />
                                    <Text style={StyleSheet.flatten([styles.buttonText, {color:'white', fontWeight:'bold'}])}>
                                        Log in
                                    </Text>
                                </Button>
                            </Col>
                            <Col size={1}>
                                <Button block light
                                    style={StyleSheet.flatten(styles.signupButton)}
                                    onPress={this.onLoginButtonPressed}>
                                    <Text style={StyleSheet.flatten(styles.buttonText)}>
                                        Sign up
                                    </Text>
                                </Button>
                            </Col>
                        </Grid>
                        
                        <Button transparent>
                            <Text>What's my password?</Text>
                            <Text>(...Wait what's my username?)</Text>
                        </Button>
                    </View>

                    <MessageBar ref='alert' />

                </KeyboardAvoidingView>
            </Image>
                    )
                }
            }

            const styles = StyleSheet.create({
                container: {
                    backgroundColor: 'rgba(255,255,255,0)',//'#86c7c9',//'#3498db',
                    flex: 1,
                    padding: 20,
                    justifyContent: 'space-between',
                },
                buttonContainer: {
                    height: 60,
                    paddingVertical: 10,
                },
                loginButtonContainer: {

                },
                signupButtonContainer: {

                },
                loginButton: {
                    backgroundColor: '#045d79',
                    marginRight: 10,
                },
                signupButton: {
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
                    //resizeMode: 'cover'
                },
                formContainer: {
                    justifyContent: 'flex-end',
                    padding: 20,
                    paddingBottom: 60
                    //margin: 30
                },
                input: {
                    color: '#045d79',
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    height: 40,
                    padding: 10,
                    marginBottom: 12,
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
