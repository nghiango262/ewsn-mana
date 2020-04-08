import React, {useState, useEffect} from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import {
    Block,
    Input,
    Text,
    Button
} from './components/react-ui';
import {theme} from './constants';
import {login} from './services/api'

import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginDto } from './services/interface';

const styles = StyleSheet.create({
    input:{
        //backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    socialView: {
        position: 'absolute',
        bottom: 15,
        left: 50,
        right: 50
    },
    textSocialButton: {
        color: '#fff',
        padding: 5,
        fontFamily: 'Arial', 
        fontSize: 16,
        textAlign: 'center'
    }
});

const App = () => {
    const [data, setData] = useState({ 
        username: '' ,
        password: ''
    });

    useEffect(() => {
        //componentDidmount

        return () => {
            // componentDidUnmount
        }
    }, [])

    
    return (
        
        <Block> 
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                <Block middle padding={30}>

                    <Input 
                        label="Tài khoản"
                        style={styles.input}
                        defaultValue={data.username}
                        onChangeText={(text: string) => setData({username: text, password: data.password})}
                    />

                    <Input 
                        secure
                        label="Mật khẩu "
                        style={styles.input}
                        defaultValue={data.password}
                        onChangeText={(text: string) => setData({username: data.username, password: text})}
                    />

                    <Button gradient onPress={() => handleLogin({
                        username: data.username,
                        password: data.password,
                        platform: (Platform.OS).toUpperCase(),
                        devicecode: 'string'
                    })}>
                        <Text bold white center>Login</Text>
                    </Button>

                    <Button onPress={() => {}}>
                        <Text grey caption center style={{textDecorationLine: 'underline'}}>Forgot your password?</Text>
                    </Button>

                </Block>
            </KeyboardAvoidingView>

            {customTextButton}
            
        </Block>
        
    )
}

const handleLogin = async (credentials: LoginDto) => {
    const response = await login(credentials);
    console.log(JSON.stringify(response, null, 2))
}

const customTextButton = (
    <Block style={styles.socialView}>
        <Icon.Button 
            name="facebook" 
            backgroundColor="#3b5998"
        >
            <Text style={styles.textSocialButton}>
                Login with Facebook
            </Text>
        </Icon.Button>
        <View style={{height:10}}/>
        <Icon.Button 
            name="google" 
            //backgroundColor="#3b5998" 
        >
            <Text style={styles.textSocialButton}>
                Login with Google
            </Text>
        </Icon.Button>
    </Block>
    
);

export default App;
