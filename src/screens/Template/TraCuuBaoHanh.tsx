import React, { Component } from 'react';
import {Block, Input, Button, Text} from '../../components/react-ui'
import Base from '../Base';
import MyHeader, { Sizes } from '../../components/MyHeader';
import {traCuuBaoHanh} from '../../services/api'
import { Alert } from 'react-native';

interface ITraCuuProps {
    route: any
    navigation: any
}

interface ITraCuuState {
    loading: boolean
    maTraCuu: string
    allowSearchByQR: boolean
}

export default class TraCuuBaoHanh extends Base<ITraCuuProps, ITraCuuState> {
    
    constructor(props: ITraCuuProps) {
        super(props);
        this.state ={
            loading: false,
            maTraCuu: '',
            allowSearchByQR: false
        }

        this.findBaoHanh = this.findBaoHanh.bind(this);
    }

    reloadData = () => {
        
    }

    findBaoHanh = (code: string) => {
        this.setState({loading: true});
        traCuuBaoHanh(code)
            .then((result) =>{
                this.setState({loading: false});
                console.log(result)
                Alert.alert(result.dsBaoHanh.toString())
            })
            .catch((err) => {
                this.setState({loading: false});
                console.log(err)
            })

    }

    findByQRCode = () => {
        this.setState({allowSearchByQR: true})
        this.props.navigation.push("Scan");
    }

    renderContent = () => {
        const { params } = this.props.route;
        let {maTraCuu, allowSearchByQR} =this.state;
        //console.log(params.code.type)
        if (params  && params.code.type === 'QR_CODE' && allowSearchByQR) {
            this.setState({allowSearchByQR: false}, () => {
                this.findBaoHanh(params.code.data);
            })
            
        }

        return (
            <Block color="#fff">
                <Block padding={[30,50]}>
                <Input 
                    style={{paddingLeft: 15}}
                    defaultValue={ maTraCuu }
                    onChangeText={(text: string)  => this.setState({ maTraCuu: text})}
                    onRightIcon={this.findByQRCode}
                />
                <Button 
                    onPress={() => this.findBaoHanh(this.state.maTraCuu)}
                    gradient
                >
                    <Text center bold>Tim</Text>
                </Button>
                </Block>
            </Block>
        );
    }
    renderHeader = () => {
        const {navigation} = this.props;
        return (
                <MyHeader 
                    title={'KHAI BÁO NHA KHOA'} 
                    color={'#04B45F'}
                    size={Sizes.Small} 
                    isHome={false} 
                    isRight={false}
                    navigation={navigation}
                />
        );
    }
}
