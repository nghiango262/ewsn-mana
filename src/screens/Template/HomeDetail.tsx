import React from 'react';
import {StatusBar} from 'react-native';
import {Block, Text, Button} from '../../components/react-ui';
import CustomHeader, { Sizes } from '../../components/MyHeader';

function HomeDetail({navigation}) {
    return (
        <Block>
            <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.20)"
            animated
            />
            <CustomHeader title={'Home detail'} size={Sizes.Large} isHome={false} navigation={navigation}/>
    
            <Block flex={1} padding={10} color="red">
            <Text h2 center>Home Detail ....</Text>
            <Button gradient
                onPress={() => navigation.goBack()}
            >
                <Text center>Go to Setting Detail!</Text>
            </Button>
            </Block>
            <Block flex={2} padding={10}>
            <Text h2 center>Home Detail ....</Text>
            <Button gradient
                onPress={() => navigation.goBack()}
            >
                <Text center>Go to Setting Detail!</Text>
            </Button>
            </Block>
            <Block flex={1} padding={10} color="green">
            <Text h2 center>Home Detail ....</Text>
            <Button gradient
                onPress={() => navigation.goBack()}
            >
                <Text center>Go to Setting Detail!</Text>
            </Button>
            </Block>
            
        </Block>
    );
 }

export default HomeDetail;
