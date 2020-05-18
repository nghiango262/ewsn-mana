import React, { Component } from 'react';
import {StyleSheet, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Block, Input, Button, Text} from '../../components/react-ui';
import { LinearGradient } from 'react-native-linear-gradient';
import Base from '../Base';
import { theme} from '../../constants';
import CustomHeader, { Sizes } from '../../components/MyHeader';
import { NhaKhoaDeclareDto, ProductDeclareDto} from '../../services/interface';
import {createNewProduct} from '../../services/api';
import { CommonActions } from '@react-navigation/native';


interface ISPProps {
    navigation: any,
    route: any
}

interface ISPState {
    name: string
    description?: string
    groupProduct?: string
    color?: string
    price: string,
    donviSanPham: string,
    nhaCungCap: string
    thoiGianBaoHanh: string 
    create_time?: string
    loading: boolean,
    allowEdit: boolean

}
export default class TaoSanPham extends Base<ISPProps, ISPState> {
    
    constructor(props) {
        super(props);
        this.state = {
            name: 'San Pham',
            description: 'Mo ta',
            groupProduct: 'NHA_KHOA',
            color:'Tim Mong mo',
            price: '100000',
            donviSanPham: 'CAI',
            nhaCungCap: 'string',
            thoiGianBaoHanh: '2',
            allowEdit: false,
            loading: false
        }
    }

    componentDidMount() {
        const {route} = this.props;
        if (route.params) {
            const {name, desc, hotline} = route.params;
            this.setState({
                name: name ||'',
                description: desc || '',
                groupProduct: hotline || '', 
            })
        }
    }

    reloadData = () => {}

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
                title={'Sản phẩm'} 
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
        const body: ProductDeclareDto = {
            name: this.state.name,
            description: this.state.description,
            groupProduct: this.state.groupProduct,
            color: this.state.color,
            price: parseInt(this.state.price),
            donviSanPham: this.state.donviSanPham,
            nhaCungCap: this.state.nhaCungCap,
            thoiGianBaoHanh: parseInt(this.state.thoiGianBaoHanh),

        } 
        this.setState({loading: true})
        createNewProduct(body)
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
                <Text h1 center bold primary style={{padding:10}}>fjksjkajkdkasj</Text>
                <Input 
                    label="Tên SP"
                    style={styles.input}
                    defaultValue={this.state.name}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ name: text})}
                />

                <Input 
                    label="Địa chỉ"
                    style={styles.input}
                    defaultValue={this.state.description}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ description: text})}
                />
                <Input 
                    label="Nhom san pham"
                    style={styles.input}
                    defaultValue={this.state.groupProduct}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ groupProduct: text})}
                />
                <Input 
                    label="Gia ban"
                    style={styles.input}
                    defaultValue={this.state.price}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ price: text})}
                />

                <Input 
                    label="Đon vi san pham"
                    style={styles.input}
                    defaultValue={this.state.donviSanPham}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ donviSanPham: text})}
                />
                <Input 
                    label="Nha cung cap"
                    style={styles.input}
                    defaultValue={this.state.nhaCungCap}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ nhaCungCap: text})}
                />

                <Input 
                    label="Thoi gian bao hnah"
                    style={styles.input}
                    defaultValue={this.state.thoiGianBaoHanh}
                    editable={this.state.allowEdit}
                    onChangeText={text => this.setState({ thoiGianBaoHanh: text})}
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
