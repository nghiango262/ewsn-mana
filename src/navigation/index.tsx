import React, {useState} from 'react';
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
;
import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Search from '../screens/Search';
import MoRong from '../screens/MoRong';
import Login from '../screens/SignIn';
import SignIn from '../screens/SignIn';
import AsyncImage from '../components/AsyncImage';


const Tab = createBottomTabNavigator();

function MainTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = focused
                    ? require('../../assets/icon/home-black.png')
                    : require('../../assets/icon/home.png');
                } else if (route.name === 'Tasks') {
                iconName = focused 
                ? require('../../assets/icon/tasks-black.png') 
                : require('../../assets/icon/tasks.png');
                } else if (route.name === 'Search') {
                    iconName = focused
                        ? require('../../assets/icon/search-black.png')
                        : require('../../assets/icon/search.png');
                } else if (route.name === 'Settings') {
                iconName = focused 
                ? require('../../assets/icon/setting-black.png') 
                : require('../../assets/icon/setting.png');
                }

                // You can return any component that you like here!
                return <AsyncImage source={iconName} style={{height:20, width:20}}/>;
            },
            })}
            tabBarOptions={{
            activeTintColor: 'green',
            inactiveTintColor: 'gray',
            }}
        
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Settings" component={MoRong} />
        </Tab.Navigator>
    );
}





function Navigation() {
    

    
}

export default MainTabNavigation;
