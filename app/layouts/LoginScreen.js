import React from 'react';
import {
    Container, Image, KeyboardAvoidingView, StyleSheet, Text,
    TextInput, TouchableHighlight, View, Keyboard, Platform, StatusBar
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Grid, Col, Button, Icon } from 'native-base';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import Dimensions from 'Dimensions'

import auth from '../lib/auth';
import colors from '../design/colors';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    state: {
        username: string,
        password: string,
        showLogo: boolean
    }

    constructor(props : any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showLogo: true,
        };
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    afterLogin = (res : Object) => {
        console.log("auth login finished");
        if (res.success) {
            // Successfully received response
            MessageBarManager.showAlert({
                title: 'Login successful!',
                message: res.body,
                alertType: 'info',
                durationToShow: 0,
            });
        } else {
            // Connection failed
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
        auth.login(this.state.username, this.state.password, this.afterLogin);
    }

    onSignupButtonPressed = () => {
        Keyboard.dismiss();
    }

    onLogoResize = (event : any) => {
        if (event.nativeEvent.layout.height < 10) {
            this.setState({showLogo: false});
        } else if (!this.state.showLogo) {
            this.setState({showLogo: true});
        }
    }

    componentDidMount() {
      // Register the alert located on this master page
      // This MessageBar will be accessible from the current (same) component, and from its child component
      // The MessageBar is then declared only once, in your main component.

      MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
      // Remove the alert located on this master page from the manager
      MessageBarManager.unregisterMessageBar();
    }

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
                        <Image
                            ref='logo'
                            source={require('../images/logo_placeholder.png')}
                            style={[
                                styles.logo,
                                { height: '75%' },
                                this.state.showLogo ? {} : {display: 'none'}
                            ]}
                            onLayout={this.onLogoResize} />
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            autoCorrect={false}
                            returnKeyType="next"
                            style={styles.input}
                            placeholder="Enter Username"
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
                            underlineColorAndroid='transparent' />

                        <View style={{height: 60}}>
                            <Grid>
                                <Col size={2.5}>
                                    <Button block primary iconLeft
                                        onPress={this.onLoginButtonPressed}
                                        style={StyleSheet.flatten(styles.loginButton)}>
                                        <Icon name='log-in' />
                                        <Text style={StyleSheet.flatten([ styles.buttonText, {color:'white', fontWeight:'700'} ])}>
                                            Log in
                                        </Text>
                                    </Button>
                                </Col>

                                <Col size={1}>
                                    <Button block light
                                        style={StyleSheet.flatten(styles.signupButton)}
                                        onPress={Actions.signup}>
                                        <Text style={StyleSheet.flatten([ styles.buttonText, {color: '#045d79'} ])}>
                                            Sign up
                                        </Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>

                        <Button block transparent
                            style={StyleSheet.flatten(styles.forgotPasswordButton)}>
                            <View style={StyleSheet.flatten(styles.forgotPasswordContainer)}>
                                <Text style={styles.forgotPasswordText}>
                                    What's my password?
                                </Text>
                                <Text style={[styles.forgotPasswordText, {fontSize: 10}]}>
                                    (...Wait what's my username?)
                                </Text>
                            </View>
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
                    backgroundColor: 'rgba(255,255,255,0)',
                    flex: 1,
                    padding: 20,
                    justifyContent: 'space-between',
                },
                buttonContainer: {

                },
                loginButtonContainer: {

                },
                signupButtonContainer: {

                },
                loginButton: {
                    backgroundColor: colors.PRIMARY[1],
                    marginRight: 10,
                },
                signupButton: {
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                },
                logo: {
                    height: 200,
                    width: 200,
                    resizeMode: 'contain'
                },
                logoContainer: {
                    alignItems: 'center',
                    flex: 1,
                    flexGrow: 1,
                    justifyContent: 'center',
                },
                formContainer: {
                    padding: 20,
                    marginBottom: 20,
                },
                forgotPasswordButton: {
                    alignSelf: 'flex-end',
                },
                forgotPasswordContainer: {
                    alignSelf: 'flex-end',
                },
                forgotPasswordText: {
                    color: colors.PRIMARY[2],
                    fontWeight: '500',
                },
                input: {
                    color: colors.PRIMARY[2],
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
