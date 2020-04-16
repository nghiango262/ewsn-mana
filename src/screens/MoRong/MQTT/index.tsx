import React, { useEffect } from 'react';
import {
    Block,
    Button,
    Text
} from '../../../components/react-ui';
import MyHeader, { Sizes } from '../../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
//import * as Mqtt from '../../../services/mqtt';



const MQTTDemo = () => {
    const navigation = useNavigation();
    //const client = new Mqtt.Client('ws://ewsn-mqtt.herokuapp.com');

    useEffect(() => {
        
    }, []);

    //
    const handleClickRight = () => {

    }

    return (
        <>
            <MyHeader
                title={'Tìm kiếm công việc, thông báo '}
                gradient
                size={Sizes.Small}
                isRight
                onClickRightIcon={handleClickRight}
                //onClickLeftIcon={implementSearch}
                onBack={() => navigation.goBack()}
            />
            <Block>
                
            </Block>
        </>
    )
}

export default MQTTDemo;
