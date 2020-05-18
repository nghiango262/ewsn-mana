import React, {useState} from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Tasks from '../screens/Tasks';
import Search from '../screens/Search';
import MoRong from '../screens/MoRong';
import AsyncImage from '../components/AsyncImage';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from '../shared/components';
import MenuSetting from '../screens/MenuSetting';
import { createStackNavigator } from '@react-navigation/stack';
import MQTTDemo from '../screens/MoRong/MQTT';
import NhaKhoa from '../screens/NhaKhoa';
import { KhaiBaoNhaKhoa } from '../screens/KhaiBaoNhaKhoa';
import Scan from '../screens/Template/Scan';
import TraCuuBaoHanh from '../screens/Template/TraCuuBaoHanh';

const Tab = createBottomTabNavigator();

const StackMoRong = createStackNavigator();

const StackNhaKhoa = createStackNavigator();

const navOptionHandler = {
    headerShown: false,

}

function NhaKhoaFeatures(props: any) {
    const { route, navigation } = props;
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false})
    } else {
        navigation.setOptions({tabBarVisible: true})
    }
    return (
        <StackNhaKhoa.Navigator initialRouteName="NhaKhoa">
            <StackNhaKhoa.Screen name="NhaKhoa" component={NhaKhoa} options={navOptionHandler}/>
            <StackNhaKhoa.Screen name="TraCuu" component={TraCuuBaoHanh} options={navOptionHandler}/>
            <StackNhaKhoa.Screen name="NhaKhoa-KhaiBao" component={KhaiBaoNhaKhoa} options={navOptionHandler}/>
            <StackNhaKhoa.Screen name="Scan" component={Scan} options={navOptionHandler} />
        </StackNhaKhoa.Navigator>

    );
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
            initialRouteName="NhaKhoaFeatures" 
            tabBar={props => 
                <BottomTabBar 
                    {...props} 
                    state={{
                        ...props.state, 
                        routes: props.state.routes.slice(0,4)
                    }}
                ></BottomTabBar>
            }
            
            screenOptions={({ route }) => ({
                tabBarVisible: tabBarVisible,
                tabBarIcon: ({ focused, color, size }) => {
                    let nameIcon = "home", bgColorIcon, colorIcon;
                    if (route.name === 'Home') {
                        nameIcon = "bell";
                    } else if (route.name === 'NhaKhoaFeatures') {
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
            
            <Tab.Screen name="NhaKhoaFeatures" component={NhaKhoaFeatures} options={{ title: 'Dentistry' }}/>
            <Tab.Screen name="Home" component={Home} options={{ title: 'Thông báo' }}/>
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="MoRongComp" component={MoRongComp} options={{ title: 'Mở rộng' }}/>
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="MenuSetting" component={MenuSetting} />
        </Tab.Navigator>
    );

}
export default MainTabNavigation
