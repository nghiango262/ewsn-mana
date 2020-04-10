import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
;
import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Search from '../screens/Search';
import MoRong from '../screens/MoRong';
import AsyncImage from '../components/AsyncImage';
import * as RootNavigation from './RootNavigation';

const Tab = createBottomTabNavigator();

function MainTabNavigation(props: any) {
    const { route } = props;
    let tabBarVisible = true; 
    
    if (route.state && route.state.index > 2) {
        tabBarVisible= false;
    } 

    return (
        <Tab.Navigator
            
            tabBar={props => 
                <BottomTabBar 
                    {...props} 
                    state={{
                        ...props.state, 
                        routes: props.state.routes.slice(0,3)
                    }}
                ></BottomTabBar>
            }
            
            screenOptions={({ route }) => ({
                tabBarVisible: tabBarVisible,
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
                inactiveTintColor: 'gray'
            }}
            
            
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Settings" component={MoRong} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    );

}
export default MainTabNavigation
