import React, { Component } from 'react';
import {TextInput} from 'react-native';
import {
    Container, Content, Text, Input, Card, Header, Body, Button, Title,
    CardItem, Form, Item, InputGroup
} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class SignupScreen extends Component {
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
                    <Item last>
                        <Input
                            ref="passwordInput"
                            placeholder="Password" secureTextEntry={true} />
                    </Item>
                </Form>

                <Button block error style={{alignSelf: 'center', margin: 30}}>
                    <Text>Join 浪！</Text>
                </Button>

            </Container>
        )
    }
}
