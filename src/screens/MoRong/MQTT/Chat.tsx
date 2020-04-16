import React, { useState, useEffect } from 'react';
import { SystemMessage, Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView, View } from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {
    Block
} from '../../../components/react-ui';


export interface IChatProps {
    dataReceiver: IMessage | null;
    onSendMessage?: (data: any) => void;

}


const otherUser = {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
}

export const Chat = (props: IChatProps) => {
    const {dataReceiver, onSendMessage} = props;
    
    const chatInit: IMessage = {
        _id: (new Date()).getTime().toString(),
        text: 'Hello VKL',
        createdAt: new Date(),
        user:{
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
        }
    }
    const [messages, setMessages] = useState([chatInit]);
    
    if (dataReceiver) {
        if (!dataReceiver.received ) {
            const msg: IMessage = {
                _id: dataReceiver._id,
                text: dataReceiver.text,
                createdAt: dataReceiver.createdAt,
                user:{
                    _id: nanoid(),
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any'
                },
                received: true

            }
            
            setMessages(
                GiftedChat.append(
                    messages,
                    [msg],
                    Platform.OS !== 'web',
                )
            )
            dataReceiver.received = true
        }
    }

    const onSend = (msgs: any) => {
        if (onSendMessage) onSendMessage(msgs);
        const sentMessages = [{ ...msgs[0], sent: true, received: false }]
        setMessages(
            GiftedChat.append(
                messages as any,
                sentMessages,
                Platform.OS !== 'web',
            )
        )
        //
    }

    const renderBubble = (props: any) => {
        return <Bubble {...props} />
    }

    const renderSystemMessage = (props: any) => {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={msgs => onSend(msgs)}
                scrollToBottom
                user={otherUser}
                keyboardShouldPersistTaps='never'
                inverted={Platform.OS !== 'web'}
                renderSystemMessage={renderSystemMessage}
                timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
            />
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={70}/>
            }
        </View>
    )
}


