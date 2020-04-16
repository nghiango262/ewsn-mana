import React, {useState} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Search from '../screens/Search';
import MoRong from '../screens/MoRong';
import AsyncImage from '../components/AsyncImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuSetting from '../screens/MenuSetting';
import { createStackNavigator } from '@react-navigation/stack';
import MQTTDemo from '../screens/MoRong/MQTT';

const Tab = createBottomTabNavigator();

const StackMoRong = createStackNavigator();
const navOptionHandler = {
    headerShown: false,

}

function MoRongComp(props: any) {
    const { route, navigation } = props;
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false})
    } else {
        navigation.setOptions({tabBarVisible: true})
    }
    return (
        <StackMoRong.Navigator initialRouteName="MoRong">
            <StackMoRong.Screen name="MoRong" component={MoRong} options={navOptionHandler}/>
            <StackMoRong.Screen name="MRMQTT" component={MQTTDemo} options={navOptionHandler}/>
        </StackMoRong.Navigator>

    );
}

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
                    let nameIcon = "home", bgColorIcon, colorIcon;
                    if (route.name === 'Home') {
                        nameIcon = "home";
                    } else if (route.name === 'Tasks') {
                        nameIcon = "sitemap";
                    } else if (route.name === 'Search') {
                        nameIcon = "search"
                    } else if (route.name === 'MoRongComp') {
                        nameIcon = "th-large";
                    }
                    
                    return <Icon name={nameIcon} color={color} size={size}/>
                },
            
            })}
            tabBarOptions={{
                activeTintColor: 'green',
                inactiveTintColor: 'gray'
            }}
            
            
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="MoRongComp" component={MoRongComp} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="MenuSetting" component={MenuSetting} />
        </Tab.Navigator>
    );

}
export default MainTabNavigation
