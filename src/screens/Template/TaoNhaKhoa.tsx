import React, { Component } from 'react';
import {StyleSheet, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Block, Input, Button, Text} from '../../components/react-ui';
import { LinearGradient } from 'react-native-linear-gradient';
import Base from '../Base';
import { theme} from '../../constants';
import CustomHeader, { Sizes } from '../../components/MyHeader';
import { NhaKhoaDeclareDto} from '../../services/interface';
import {createNewNhaKhoa} from '../../services/api';
import { CommonActions } from '@react-navigation/native';


interface INotifyProps {
    navigation: any,
    route: any
}

interface INotifyState {
    name: string
    address: string
    hotline: string
    loading: boolean,
    allowEdit: boolean
}
export default class TaoNhaKhoa extends Base<INotifyProps, INotifyState> {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            hotline: '',
            allowEdit: false,
            loading: false
        }
    }

    componentDidMount() {
        const {route} = this.props;
        if (route.params) {
            const {name, address, hotline} = route.params;
            this.setState({
                name: name ||'',
                address: address || '',
                hotline: hotline || '', 
            })
        }
    }

    reloadData = () => {

    }

    handleClickRightIcon =(data) => {
        Alert.alert(data)
    }

    renderHeader = () => {
        return (
            <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0.1, 0.9]}
                    
                    colors={[theme.colors.primary, theme.colors.secondary]}
                >
            <CustomHeader 
                title={'Setting Nha Khoa'} 
                size={Sizes.Small} 
                isHome={false} 
                navigation={this.props.navigation} 
                isRight
                colorTitle='red'
            />
            </LinearGradient>
        );
    }
    handleSend = () => {
        this.setState({loading: true})
        const body: NhaKhoaDeclareDto = {
            name: this.state.name,
            address: this.state.address,
            hotline: this.state.hotline
        } 
        this.setState({loading: true})
        createNewNhaKhoa(body)
        .then((result) => {
            //Alert.alert('Thong bao', result);
            this.setState({loading: false}) 
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [    
                        {
                            name: 'QuanLyChungScreen'
                        },
                    ],
                })
            );
        })
        .catch(err => {
            console.error(err);
            this.setState({loading: false})
        })


    }


    renderContent = () => {
        const {route} = this.props;
        //this.setState({allowEdit: route.params?true:false})
        console.log(route.params)
        return (
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <Block color="#fff">
                
                <ScrollView keyboardShouldPersistTaps='handled'>
                
                <Block middle padding={30}>
                <Text h1 center bold primary style={{padding:10}}>KHAI BÁO NHA KHOA MỚI</Text>
                <Input 
                    label="Tên Nha khoa"
                    style={styles.input}
                    defaultValue={this.state.name}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ name: text})}
                />

                <Input 
                    label="Địa chỉ"
                    style={styles.input}
                    defaultValue={this.state.address}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ address: text})}
                />
                <Input 
                    label="Hotline"
                    style={styles.input}
                    defaultValue={this.state.hotline}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ hotline: text})}
                />
                
                {(!route.params || this.state.allowEdit)? <Button gradient onPress={() => this.handleSend()}>
                    <Text bold white center>TẠO</Text>
                </Button>: null}
                </Block>
                </ScrollView>

            </Block>
            </KeyboardAvoidingView>
        );
    }
    
}

const styles = StyleSheet.create({
    input:{
        //backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
});
