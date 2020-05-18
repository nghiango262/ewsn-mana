import React, { Component } from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {Block, Input, Button, Text} from '../../components/react-ui';
import Base from '../Base';
import { theme} from '../../constants';
import MyHeader, { Sizes } from '../../components/MyHeader';
import {CreateNotify, CreateNotifyTask} from '../../services/interface';
import {createNotifyTask} from '../../services/api';
import { CreateNotifyDto, CreateNotifyTaskDto } from 'src/services/interface';


interface INotifyProps {
    navigation: any
}

interface INotifyState {
    title: string
    desc: string
    receiver: string
    deadline:string
    loading: boolean
}
export default class CreateTaskNotification extends Base<INotifyProps, INotifyState> {
    reloadData = () => {}
    constructor(props) {
        super(props);
        this.state = {
            title: 'Thong bao so',
            desc: 'day la thong bao test',
            receiver: 'EMPLOYEE',
            deadline: '24288282',
            loading: false
        }
    }
    renderHeader = () => {
        return (
            <MyHeader title={'Send notification'} color={theme.colors.primary} size={Sizes.Small} isHome={false} navigation={this.props.navigation}/>
        );
    }
    handleSend = () => {
        const body: CreateNotifyTaskDto = {
            title: this.state.title,
            description: this.state.desc,
            manage_user: 'nghiango',
            task_for: this.state.receiver,
            deadline: this.state.deadline
        } 
        this.setState({loading: true})
        createNotifyTask(body)
        .then((result) => {
            Alert.alert(result.title, JSON.stringify(result));
            this.setState({loading: false}) 
        })
        .catch(err => {
            this.setState({loading: false})
            Alert.alert('Error', JSON.stringify(err));
            console.log('Error ', JSON.stringify(err));
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
                    label="Đối tượng nhận Task:"
                    style={styles.input}
                    defaultValue={this.state.receiver}
                    onChangeText={text => this.setState({ receiver: text})}
                />
                <Input 
                    label="Deadline"
                    style={styles.input}
                    defaultValue={this.state.deadline}
                    onChangeText={text => this.setState({ deadline: text})}
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
