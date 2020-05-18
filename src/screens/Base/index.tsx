import React, { Component } from 'react';
import {StatusBar, View, Dimensions, Text, StyleSheet, Animated} from 'react-native';
import {Block} from '../../components/react-ui';
import Loader from '../../components/Loader';
const { width } = Dimensions.get('window');
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from '@react-native-community/netinfo';
import {gVar} from '../../utils/globalVar';

interface IBaseProps {
    navigation: any
}

interface IBaseState {
    loading: boolean;
}

export default abstract class BaseScreen<P extends IBaseProps, S extends IBaseState>  extends Component<P, S> {
    
    constructor(props:P) {
        super(props);
        this.state = {
            loading: false,

        } as S;
    }
    // Subscribe
    unsubscribe = () => NetInfo.addEventListener(state => {    
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);

        if ((gVar.isNotConnected && state.isConnected) || (!state.isConnected))this.showHang(state.isConnected)
        gVar.isNotConnected = !state.isConnected; 
    });

    showHang = (state:any) => {
        showMessage({
            message: state? 'Đang kết nối Internet…':'Đã mất kết nối Internet.',
            type: state?"success":"danger",
            position: "bottom",
            autoHide: state?true:false
            //floating: true
            //hideStatusBar:true
            //color: "#fff", // text color

        });

        if (state) this.reloadData();
    }

    componentDidMount() {
        this.unsubscribe();
    }

    abstract reloadData = () => {
        //implement at child class
    }

    abstract renderContent = () => {
        return (
            <Block>

            </Block>
        );
    }

    abstract renderHeader = () => {
        return (
            <View>

            </View>
        );
    }

    render() {
        return ( 
    
            <Block color="#f2f2f2">
                
                {this.renderHeader()}
                {this.renderContent()} 
                {this.state.loading && <Loader />}
            </Block>
        )
    }
}