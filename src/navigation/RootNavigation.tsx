// RootNavigation.js

import * as React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export enum ERouteName{
    Home,
    Tasks,
    Settings
}

export const isMountedRef: any = React.createRef();
export const navigationRef: any = React.createRef();



export function navigate(name: string , params?: any) {
    
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current && navigationRef.current.navigate(name, params);
    }
}


export function push(name: string , params: any) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
}

// add other navigation functions that you need and export them


export function resetTo(routeName: number) {
    
    if (isMountedRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current?.dispatch(
            CommonActions.reset({
                index: routeName,
                routes: [
                    { name: 'Home' },
                    { name: 'Tasks' },
                    { name: 'Settings'}, 
                ],
            })
        );
    }
}