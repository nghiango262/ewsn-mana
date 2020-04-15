import React from 'react';
import { FlatList, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import AsyncImage from '../../components/AsyncImage';
import { useNavigation } from '@react-navigation/native';

const featureArr =[
    {
        id: 1,
        image: require('../../../assets/image/nature.png'),
        title:'MQTT',
        route: 'MRMQTT'
    }, 
    {
        id: 1,
        image: null,
        title: 'ao ba lo',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'con chuot',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'con cmeo',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'dien thoai',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'ly nuoc',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'banh trang',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'amazon',
        route: 'MR'
    }, {
        id: 1,
        image: null,
        title: 'google',
        route: 'MR'
    }]
const gridFeatures = (props: any) => {
    const {navigation} = props;
    return (
        <Block flex={false}>
        <FlatList
            data={featureArr}
            style={{padding:10, marginTop:10, backgroundColor: '#fff', flex:0}}
            renderItem={({ item }) => {
                const iimage = item.image===null? (require('../../../assets/icon/edit.png')) : item.image;
                return (
                <View style={{ flex: 1, flexDirection: 'column', padding: 5, justifyContent: 'center',
                alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <Image style={styles.imageThumbnail} resizeMode="contain" source={iimage} />
                        <Text style={{textAlign:'center', marginTop: 8}}>{item.title}</Text>
                    </TouchableOpacity>
                </View>
                
                
            )}}
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
                source={require('../../../assets/image/user_avatar_default.png')}
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
            {gridFeatures({navigation})}
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
