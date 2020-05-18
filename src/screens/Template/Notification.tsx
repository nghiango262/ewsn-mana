import React from 'react';
import {StatusBar} from 'react-native';
import {Block, Text} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader'

function Notification({navigation}) {
    return (
        <Block style={{flex: 1}}>
            <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.20)"
            animated
            />
            <MyHeader title={'Notification'} size={Sizes.Large} isHome={false} navigation={navigation}/>
            <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notification Screen</Text>
            </Block>
        </Block>
        
    );
 }
export default Notification;
