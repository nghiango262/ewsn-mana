import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    View,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import {
    Block,
    Input,
    Text,
    Button
} from '../../components/react-ui';
import { theme } from '../../constants';
import { login } from '../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginDto } from '../../services/interface';
import { successLogin } from '../../store/actions/account.action';
//import { IUser } from '../../store/models/user.interface';
import { IAccount } from '../../store/models/account.interface';
import { saveStateLogin } from '../../utils/globalVar'
import Loader from '../../components/Loader';
import { IStateType } from 'src/store/models/root.interface';

const styles = StyleSheet.create({
    input: {
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

const SignIn = (props: any) => {
    const { navigation } = props;
    const dispatch: Dispatch<any> = useDispatch();
    let account: IAccount = useSelector((state: IStateType) => state.account);
    console.debug('QQQ======> ', JSON.stringify(account, null, 2));
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        //componentDidmount

        return () => {
            // componentDidUnmount
        }
    }, [])

    //call api de xac thuc tai khoan nguoi dung
    const handleLogin = async (credentials: LoginDto) => {
        //check valid usser name
        if (!data.username || data.username.length <= 0) {
            Alert.alert('Thông báo', 'Vui lòng nhập username.')
            return;
        }

        //check pass 
        if (!data.password || data.password.length <= 0) {
            Alert.alert('Thông báo', 'Vui lòng nhập password.')
            return;
        }

        setLoading(true);
        const response = await login(credentials);
        //console.log(JSON.stringify(response, null, 2))
        const account: IAccount = {
            accessToken: response.accessToken,
            user: response.user,
            userPass: credentials.password,
            isLogin: true
        }
        saveStateLogin(account)
        dispatch(successLogin(account))
        setLoading(false);
    }

    if (loading) return (<Loader />);

    return (

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

            <Block color={'#fff'} middle padding={[0, 30, 100]}>

                <Input
                    label="Tài khoản"
                    style={styles.input}
                    defaultValue={data.username}
                    onChangeText={(text: string) => setData({ username: text, password: data.password })}
                />

                <Input
                    secure
                    label="Mật khẩu "
                    style={styles.input}
                    defaultValue={data.password}
                    onChangeText={(text: string) => setData({ username: data.username, password: text })}
                />

                <Button gradient onPress={() => handleLogin({
                    username: data.username,
                    password: data.password,
                    platform: (Platform.OS).toUpperCase(),
                    devicecode: 'string'
                })}>
                    <Text bold white center>Login</Text>
                </Button>

                <Button onPress={() => { }}>
                    <Text grey caption center style={{ textDecorationLine: 'underline' }}>Forgot your password?</Text>
                </Button>

            </Block>
        </KeyboardAvoidingView>

    )
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
        <View style={{ height: 10 }} />
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

export default SignIn;
