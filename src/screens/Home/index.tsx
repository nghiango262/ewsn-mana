import React from 'react';
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import * as RootNavigation from '../../navigation/RootNavigation';


function Home() {

    const implementSearch = () => {
        console.log('Search: ')
        RootNavigation.navigate('Search', {user: 'dadas'}); 
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
                    onPress={() => RootNavigation.push('Search', {})}
                ><Text>kkkk</Text></Button>
            </Block>
        </>
    )
}

export default Home;
