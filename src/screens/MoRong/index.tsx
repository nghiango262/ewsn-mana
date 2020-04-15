import React from 'react';
import { FlatList, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import AsyncImage from '../../components/AsyncImage';
import { useNavigation } from '@react-navigation/native';

const featureArr =[
    {
        id: 1,
        image: null,
        title:'quan xi con'
    }, 
    {
        id: 1,
        image: null,
        title: 'ao ba lo'
    }, {
        id: 1,
        image: null,
        title: 'con chuot'
    }, {
        id: 1,
        image: null,
        title: 'con cmeo'
    }, {
        id: 1,
        image: null,
        title: 'dien thoai'
    }, {
        id: 1,
        image: null,
        title: 'ly nuoc'
    }, {
        id: 1,
        image: null,
        title: 'banh trang'
    }, {
        id: 1,
        image: null,
        title: 'amazon'
    }, {
        id: 1,
        image: null,
        title: 'google'
    }]
const gridFeatures = () => {
    return (
        <Block flex={false}>
        <FlatList
            data={featureArr}
            style={{padding:10, marginTop:10, backgroundColor: '#fff', flex:0}}
            renderItem={({ item }) => (
                
                <View style={{ flex: 1, flexDirection: 'column', padding: 5, justifyContent: 'center',
                alignItems: 'center', }}>
                    <TouchableOpacity>
                    <Image style={styles.imageThumbnail} resizeMode="contain" source={require('../../../assets/icon/edit.png')} />
                    <Text style={{textAlign:'center', marginTop: 8}}>{item.title}</Text>
                    </TouchableOpacity>
                </View>
                
                
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
        />
        </Block>
    );
}

//
const UserInforView = () => (
    <Block flex={false} row color="#fff">
        <Block flex={false} middle margin={15}>
            <AsyncImage 
                source={require('../../../assets/icon/edit.png')}
                style={{height:45, width:45 }}
            />
        </Block>
        
        <Block margin={10} middle>
            <Text h3>Ngo NGHIA</Text>
            <Text gray>Trang ca nhan nguoi dung</Text>
        </Block>
    </Block>
)

function MoRong() {
    const navigation = useNavigation();

    const handleClickRight = () => {
        console.log('RRRR: ')
        navigation.navigate('MenuSetting')
    }

    return (
        <>
        <MyHeader
                title={'Tìm kiếm công việc, thông báo '}
                gradient
                isHome
                size={Sizes.Small}
                isRight
                onClickRightIcon={handleClickRight}
                //onClickLeftIcon={implementSearch}
                onBack={() => navigation.goBack()}
            />
        <Block>
            {UserInforView()}
            {gridFeatures()}
        </Block>
        </>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});

export default MoRong;
