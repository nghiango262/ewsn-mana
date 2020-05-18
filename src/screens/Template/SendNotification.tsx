import React, { Component } from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {Block, Input, Button, Text} from '../../components/react-ui';
import Base from '../Base';
import { theme} from '../../constants';
import CustomHeader, { Sizes } from '../../components/MyHeader';
import {createNotification} from '../../services/api';
import { CreateNotifyDto } from 'src/services/interface';


interface INotifyProps {
    navigation: any
}

interface INotifyState {
    title: string
    desc: string
    receiver: string
    spec:string
    loading: boolean
}
export default class SendNotification extends Base<INotifyProps, INotifyState> {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            receiver: '',
            spec: '',
            loading: false
        }
    }
    renderHeader = () => {
        return (
            <CustomHeader title={'Send notification'} color={theme.colors.primary} size={Sizes.Small} isHome={false} navigation={this.props.navigation}/>
        );
    }

    reloadData = () => {}
    handleSend = () => {
        const body: CreateNotifyDto = {
            title: this.state.title,
            description: this.state.desc,
            type: this.state.receiver,
            spec: this.state.spec
        } 
        this.setState({loading: true})
        createNotification(body)
        .then((result) => {
            Alert.alert('Thoong baos', result.toString());
            this.setState({loading: false}) 
        })
        .catch(err => {
            console.error(err);
            this.setState({loading: false})
        })


    }


    renderContent = () => {
        return (
            <Block color="#fff">
                
                <ScrollView keyboardShouldPersistTaps='handled'>
                
                <Block middle padding={30}>
                <Text h1 center bold primary style={{padding:10}}>THÔNG BÁO</Text>
                <Input 
                    label="Tiêu đề"
                    style={styles.input}
                    defaultValue={this.state.title}
                    onChangeText={text => this.setState({ title: text})}
                />

                <Input 
                    label="Mô Tả"
                    style={styles.input}
                    defaultValue={this.state.desc}
                    onChangeText={text => this.setState({ desc: text})}
                />
                <Input 
                    label="Đối tượng nhận"
                    style={styles.input}
                    defaultValue={this.state.receiver}
                    onChangeText={text => this.setState({ receiver: text})}
                />
                <Input 
                    label="Đặc tả thông điệp"
                    style={styles.input}
                    defaultValue={this.state.spec}
                    onChangeText={text => this.setState({ spec: text})}
                />
                <Input 
                    label="Quan"
                    style={styles.input}
                    defaultValue={this.state.spec}
                    onChangeText={text => this.setState({ spec: text})}
                />
                <Button gradient onPress={() => this.handleSend()}>
                    <Text bold white center>Send</Text>
                </Button>
                </Block>
                </ScrollView>

            </Block>
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
