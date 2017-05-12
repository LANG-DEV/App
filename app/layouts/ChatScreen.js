/**
* @flow
*/

import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';

import HomeScreen from './HomeScreen';
import ChatActionButton from '../components/ChatActionButton';

export default class ChatScreen extends Component {
    props : {};

    state : {
        messages: Array < Object >
    };

    constructor(props : any) {
        super(props);
        this.state = {
            messages: []
        };
    }

    onSend = (messages : Array < Object > = []) => {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages)
            };
        });
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png'
                    }
                }
            ]
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                renderActions={() => {return <ChatActionButton options={{'1st': ()=>{}, '2nd': ()=>{}}} />;}}
                user={{
                    _id: 1
                }}
            />
        );
    }
}
