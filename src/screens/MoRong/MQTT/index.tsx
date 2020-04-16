import React, { useEffect, useState } from 'react';
import {
    Block,
    Button,
    Text
} from '../../../components/react-ui';
import MyHeader, { Sizes } from '../../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';
//import * as Mqtt from '../../../services/mqtt';
import {mqttService} from "../../../services/MqttService";
import {Chat} from '../MQTT/Chat';
import { IMessage } from 'react-native-gifted-chat';

export const TOPIC_B = `ewsn/chat/${2}`;
export const TOPIC_A = `ewsn/chat/${1}`;

const MQTTDemo = () => {
    
    const navigation = useNavigation();
    const [message, setMessage] = useState(null);
    const [isConnected, setConnected] = useState(false);

    useEffect(() => {
        mqttService.connectClient(
            mqttSuccessHandler,
            mqttConnectionLostHandler
        );
        return () => {
            console.info("Disconnected to mqtt");
            mqttService.onDisconnectClient();
        }
    }, []);

    const onWORLD = (message: any) => {
        console.info(message.toString());
        var obj = JSON.parse(message);
        setMessage(obj)
        
    };

    const mqttSuccessHandler = () => {
        console.info("connected to mqtt");
        mqttService.subscribe(TOPIC_B, onWORLD);

        setConnected(true)
    };

    const mqttConnectionLostHandler = () => {
        setConnected(false)
    };
    const onPublish = () => {
        mqttService.publishMessage("test", "Hello from the app");
    }

    const onSendMessage = (data: any) => {
        mqttService.publishMessage(TOPIC_A, JSON.stringify(data));
    }

    //
    const handleClickRight = () => {

    }

    return (
        <>
            <MyHeader
                title={'Test MQTT '}
                gradient
                size={Sizes.Small}
                isRight
                onClickRightIcon={handleClickRight}
                //onClickLeftIcon={implementSearch}
                onBack={() => navigation.goBack()}
            />
            <Chat 
                dataReceiver={message}
                onSendMessage={onSendMessage}
                
            />
        </>
    )
}

// const renderFooter = (props: any) => {
//     if (props.typingText) {
//       return (
//         <View style={styles.footerContainer}>
//           <Text style={styles.footerText}>{props.typingText}</Text>
//         </View>
//       );
//     }
//     return null;
//   }

export default MQTTDemo;
