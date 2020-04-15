import React from 'react';
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import { useNavigation, useNavigationState } from '@react-navigation/native';


function Home() {
    const navigation = useNavigation(); 

    const implementSearch = () => {
        navigation.navigate('Search', {user: 'dadas'}); 
    }
    return (
        <>
            <MyHeader
                title={'Tìm kiếm công việc, thông báo '}
                gradient
                isHome
                size={Sizes.Small}
                isRight
                onClickRightIcon={() => {console.log('RRRR: ')}}
                onClickLeftIcon={implementSearch}
            />
            <Block center medium>
                <Text>Home</Text>
                <Button
                    onPress={implementSearch}
                ><Text>kkkk</Text></Button>
            </Block>
        </>
    )
}

export default Home;
