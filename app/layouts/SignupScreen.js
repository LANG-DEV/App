import React, { Component } from 'react';
import {
    Image, KeyboardAvoidingView, StyleSheet,
    TextInput, TouchableHighlight, View, Keyboard, Platform, StatusBar
} from 'react-native';

import {
    Container, Content, Text, Input, Card, Header, Body, Button, Title,
    CardItem, Form, Item, InputGroup
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import auth from '../lib/auth';

export default class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Signup',
    };

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            password_confirmation: ''
        };
    }

    attemptSignup = (res) => {
        if (res.success) {
            MessageBarManager.showAlert({
                title: 'Signup successful!',
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

    onSignupButtonPressed = () => {
        Keyboard.dismiss();
        auth.signup(this.state.firstname, this.state.lastname,
                    this.state.username, this.state.password, this.state.password_confirmation,
                    this.attemptSignup);
    }

    componentDidMount() {
      // Register the alert located on this master page
      // This MessageBar will be accessible from the current (same) component, and from its child component
      // The MessageBar is then declared only once, in your main component.
      MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
      // Remove the alert    located on this master page from the manager
      MessageBarManager.unregisterMessageBar();
    }

    render() {
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Signup</Title>
                    </Body>
                </Header>
                <Form>
                    <Item>
                        <Input
                            onSubmitEditing={()=>{this.refs.lastnameInput._root.focus();}}
                            placeholder="Firstname" />
                    </Item>
                    <Item>
                        <Input
                            ref="lastnameInput"
                            onSubmitEditing={()=>{this.refs.usernameInput._root.focus();}}
                            placeholder="Lastname" />
                    </Item>
                    <Item>
                        <Input
                            ref="usernameInput"
                            onSubmitEditing={()=>{this.refs.passwordInput._root.focus();}}
                            placeholder="Username" />
                    </Item>
                    <Item>
                        <Input
                            ref="passwordInput"
                            onSubmitEditing={()=>{this.refs.passwordConfirmationInput._root.focus();}}
                            placeholder="Password" secureTextEntry={true}/>
                    </Item>
                    <Item last>
                        <Input
                            ref="passwordConfirmationInput"
                            //onSubmitEditing={()=>{this.refs.passwordConfirmationInput._root.focus();}}
                            placeholder="Confirm password" secureTextEntry={true} />
                    </Item>
                </Form>

                <Button block error style={{alignSelf: 'center', margin: 30}}
                    onPress={this.onSignupButtonPressed}>
                    <Text>Join 浪！</Text>
                </Button>

                <MessageBar ref='alert' style={styles.messageBar}/>

            </Container>
        );
    }
}

// const Errors = (props) => {
//     return (
//         <View>
//         {props.errors.map((error, i) => <Text key={i} style={styles.error}>{error}</Text>)}
//         </View>
//     );
// }

const styles = StyleSheet.create({
    messageBar: {
        marginTop: 200
    }
})
