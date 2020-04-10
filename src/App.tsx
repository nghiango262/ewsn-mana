/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {Provider} from "react-redux";
import store from "./store/store";
import 'react-native-gesture-handler';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef, isMountedRef } from './navigation/RootNavigation';
import { useDispatch, useSelector } from "react-redux";
import {gVar, getStateLoginForgVar} from './utils/globalVar';
import { User } from './services/interface';
import MainTabNavigation from './navigation';
import SignIn from './screens/SignIn';
import { IAccount } from './store/models/account.interface';
import { IStateType } from './store/models/root.interface';

const Stack = createStackNavigator();
const navOptionHandler = {
  headerShown: false,
}

const App = () => {
  const account: IAccount = useSelector((state: IStateType) => state.account);
  console.debug('======> ' , JSON.stringify(account, null, 2)); 
    
  useEffect(():any => {
    isMountedRef.current = true;
    console.debug(navigationRef);
    return () => (isMountedRef.current = false);
  }, []);

  setTimeout(() => {
    if(gVar.isLogin) {
      //navigationRef.current.navigate('Search');
      console.log('SEARCHING...')
    }
  }, 5000 );

  return (
      <NavigationContainer ref={navigationRef}>
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
