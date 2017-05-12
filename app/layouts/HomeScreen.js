/**
* @flow
*/

import React, { Component } from 'react';
import {
    Container, Content, Text, Input, Card, Header, Body, Button, Title,
    CardItem, Form, Item
} from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class HomeScreen extends Component {
    render(){
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>
                                    This home page is still under construction...
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                    </Form>

                    <Button block style={{alignSelf: 'center', margin: 30}}
                        onPress={Actions.login}>
                        <Text>Go to Log-in Page</Text>
                    </Button>

                    <Button block error style={{alignSelf: 'center', margin: 30}}
                        onPress={Actions.signup}>
                        <Text>Go to Sign-up Page</Text>
                    </Button>

                    <Button block error style={{alignSelf: 'center', margin: 30}}
                        onPress={Actions.chat}>
                        <Text>Go to test Chat Page</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
