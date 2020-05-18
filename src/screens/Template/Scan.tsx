import React, { Component, Fragment } from 'react';
import {AppState, AppStateStatus} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
    TouchableOpacity,
    
    Linking,
    View,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import {theme} from '../../constants'
import {Block, Button, Text} from '../../components/react-ui'
import MyHeader, { Sizes } from '../../components/MyHeader';
import { CommonActions } from '@react-navigation/native';
import Base from '../Base'

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

interface ISCanProps {
    navigation: any
}

interface IScanState {
    allowScan: boolean, 
    ScanResult: boolean, 
    result: any,
    loading: boolean,
    appState: AppStateStatus
}

class Scan extends Base<ISCanProps, IScanState> {
    reloadData =  () =>  {}
    scanner: any;
    constructor(props) {
        super(props);
        this.state = {
            allowScan: true,
            ScanResult: false,
            result: null,
            loading: false,
            appState: AppState.currentState
        } as any;
        
    }


    onSuccess = async (e) => {
        const check = e.data.substring(0, 4);
        
        this.setState({
            result: e,
            allowScan: false,
            ScanResult: true
        })
        if (check === 'http') {
            //Alert.alert('Thong bao', e.data);
            await Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));
        } else {
            await this.props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'TraCuu',
                        params: {
                            code: e
                        }
                })
            );
        }

    }
    
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    async componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            await this.scanner.reactivate();
            this.setState({allowScan:true});
        }
        this.setState({appState: nextAppState});
    }

    renderContent = () => {
        return (
            <Block>
                <Block color="grey">
                {this.state.allowScan && <QRCodeScanner
                    //reactivate={true}
                    showMarker={true}
                    checkAndroid6Permissions={true}
                    
                    ref={(node) => { 
                        this.scanner = node?node:this.scanner;
                        //console.log(this.scanner)  
                    }}
                    onRead={this.onSuccess}
                    cameraStyle={{height: 320}}
                        
                />}
                </Block>
                <Block flex={false} padding={30}>
                    <Button 
                        gradient 
                        onPress={() => {
                            this.scanner.reactivate();
                            this.setState({allowScan:true});
                    }}
                    ><Text center bold>Re-Scan</Text></Button>
                </Block>
            </Block>
        )
    }

    renderHeader = () => {
        return (
            <MyHeader 
                title={'Quet Ma QR'} 
                gradient
                size={Sizes.Small} 
                isHome={false} 
                navigation={this.props.navigation}
                onBack={() => this.props.navigation.goBack()}
            />    
                
        );
    }

    
}



export default Scan;
