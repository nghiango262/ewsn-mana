// RootNavigation.js

import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const isMountedRef: any = React.createRef();
export const navigationRef: any = React.createRef();

export function navigate(name: string , params: any) {
    
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params);
    }
}

// export function push(...args) {
//     navigationRef.current?.dispatch(StackActions.push(...args));
// }

// add other navigation functions that you need and export them