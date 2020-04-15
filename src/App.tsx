/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState, Dispatch } from 'react';
import {Provider} from "react-redux";
import store from "./store/store";
import 'react-native-gesture-handler';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { navigationRef, isMountedRef } from './navigation/RootNavigation';
import { useDispatch, useSelector } from "react-redux";
import {gVar, getStateLoginForgVar, saveStateLogin} from './utils/globalVar';
import { User, LoginDto } from './services/interface';
import MainTabNavigation from './navigation';
import SignIn from './screens/SignIn';
import { IAccount } from './store/models/account.interface';
import { IStateType } from './store/models/root.interface';

import {login} from './services/api';
import messaging from '@react-native-firebase/messaging';
import { successLogin } from './store/actions/account.action';
import { Platform } from 'react-native';
import Loader from './components/Loader';

const Stack = createStackNavigator();
const navOptionHandler = {
  headerShown: false,
}



const App = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useState(false);
  const account: IAccount = useSelector((state: IStateType) => state.account);
  console.debug('======> ' , JSON.stringify(account, null, 2)); 
    
  useEffect(():any => {
    //
    (async () => {
      if (account.isLogin) {
        
        handleLogin({
          username: account.user.username,
          password: account.userPass?account.userPass : "",
          platform: (Platform.OS).toUpperCase(),
          devicecode: account.fcmToken ? account.fcmToken : "" 
      })
      }
    })();
    return () => {
      
    }
  }, []);

  //call api de xac thuc tai khoan nguoi dung
  const handleLogin = async (credentials: LoginDto) => {
    setLoading(true);
    const response = await login(credentials);
    //console.log(JSON.stringify(response, null, 2))
    const account: IAccount = {
        accessToken: response.accessToken,
        user: response.user,
        userPass: credentials.password,
        isLogin: true
    }
    saveStateLogin(account);
    dispatch(successLogin(account));
    setLoading(false); 
  }

  if (loading) return (<Loader />);

  return (
      <NavigationContainer>
        <Stack.Navigator>
              {!account.isLogin ? (
                  <Stack.Screen
                      name="SignIn"
                      component={SignIn}
                      options={navOptionHandler}
                  />
              ) : ( 
                  <Stack.Screen 
                      name="MainTabNavigation" 
                      component={MainTabNavigation} 
                      options={navOptionHandler}
                  />
              )}
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
