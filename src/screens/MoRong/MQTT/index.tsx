import React from 'react';
import {
    Block,
    Button,
    Text
} from '../../../components/react-ui';
import MyHeader, { Sizes } from '../../../components/MyHeader';
import { useNavigation } from '@react-navigation/native';

const MQTT = () => {
    const navigation = useNavigation();

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

export default MQTT
