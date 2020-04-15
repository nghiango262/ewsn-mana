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
import store from "./src/store/store";
import App from './src/App';
import { getStateLoginForgVar } from './src/utils/globalVar';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const settings = await messaging().requestPermission();

  if (settings) {
    console.log('Permission settings:', settings);
    await registerAppWithFCM();
  }
}

async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();

}



const AppContainer = () => {
  const [ start, setStart] = useState(false);// isCacheDataLoaded = false;
  useEffect(():any => {
    SplashScreen.hide();
    // Using an IIFE
    (async () => {
      await getStateLoginForgVar();
      await requestUserPermission();
      await registerAppWithFCM();
      console.log(await messaging().getToken())
      setStart(true);
      
    })();
    
    //
    //return () => {};
  }, []);

  return (
    <Provider store={store}>
      {start && <App />}
    </Provider> 
  );
};

export default AppContainer;
