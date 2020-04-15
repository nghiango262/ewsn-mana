import React from 'react';
import {Block, Text} from '../../components/react-ui';
import SearchHeader, { Sizes } from '../../components/SearchHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncImage from '../../components/AsyncImage';
import MyHeader from '../../components/MyHeader';



const MenuSetting = () => {
    const navigation = useNavigation();
    return (
        <>
            <MyHeader
                gradient
                isHome={false}
                size={Sizes.Small}
                //onClickRightIcon={() => {console.log('RRRR: ')}}
                onBack={() => navigation.goBack()}
            />
            <Block>
                
            </Block>
        </>
    )
}

export default MenuSetting;
