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



const AppContainer = () => {
  const [ start, setStart] = useState(false);// isCacheDataLoaded = false;
  useEffect(():any => {
    // Using an IIFE
    (async () => {
      await getStateLoginForgVar();
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
