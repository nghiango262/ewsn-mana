/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './AppContainer';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => AppContainer);
