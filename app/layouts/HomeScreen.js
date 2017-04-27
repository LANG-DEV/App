import React from 'react';
import {Text, View, Button} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return (
            <View>
                <Text>This is the home page.</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Login')}
                    title='Log in'
                />
            </View>
        );
    }
}
