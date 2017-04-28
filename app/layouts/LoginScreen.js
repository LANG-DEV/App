import React from 'react';
import {
    Button,
    Container,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import auth from '../lib/auth';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
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

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'>

                <MessageBar ref='alert' />

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
                        onChangeText={(text) => this.setState({username: text})}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}/>
                    <Button
                        title='LOGIN'
                        style={styles.buttonContainer}
                        onPress={this.onLoginButtonPressed}>

                    </Button>
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
