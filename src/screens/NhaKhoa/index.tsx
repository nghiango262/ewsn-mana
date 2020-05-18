import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Animated, ScrollView} from 'react-native';
import { Block, Text, Button, Card} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import { MCardView } from '../../components/MCardView';
import { NhaKhoaDeclareDto, ProductDeclareDto } from '../../services/interface';
import { getDsNhaKhoa, getDsSanPham } from '../../services/api';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const managerCreator = [
    { title: 'Tra cứu bảo hành', description: '', image: null, backgroundColor: 'rgba(189, 19, 19, 0.3)', route: 'TraCuu'},
    { title: 'Khai báo bảo hành', description: '', image: null,backgroundColor: 'rgba(189, 19, 191, 0.3)', route: 'NhaKhoa-KhaiBao'},
    { title: 'Tạo nha khoa', description: 'Khai báo thông tin nha khoa , cơ sở nha khoa mới', image: null,backgroundColor: 'rgba(89, 19, 19, 0.3)', route: 'TaoNhaKhoaScreen'},
    { title: 'Tạo sản phẩm', description: 'Nhập/Khai báo sản phẩm mới', image: null, backgroundColor: 'rgba(189, 192, 19, 0.3)',route: 'TaoSanPhamScreen'},
]

const renderDanhSachSanPham= (navigation: any, dsNhakhoa: Array<ProductDeclareDto>) => {
    return (
        <FlatList 
            horizontal
            // pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // snapToAlignment="center"
            data={dsNhakhoa.reverse()}
            //extraData={this.state}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({item}) => {
                const timeNew = item.create_time === undefined ? 10000:(Date.now() - Date.parse(item.create_time))/1000;
                //console.log(`Props: ${JSON.stringify(timeNew)}`)
                return (
                    <MCardView 
                        imgSrc={require('../../../assets/image/intro_work_3.png')} 
                        title={item.name === undefined? 'No Title' : item.name} 
                        backgroundColor='rgba(189, 19, 19, 0.3)'
                        description={''} 
                        data={item} 
                        addTagNew={timeNew<180?true:false}
                        onClick={data => console.log(data)}
                        //
                        //onClick={data => navigation.navigate('TaoSanPhamScreen', data)}
                    />
                    
                );
            }}
            onScroll={
                Animated.event([
                    {
                        nativeEvent: {contentOffset: {x: new Animated.Value(0)}}

                    }
                ], {useNativeDriver: false})
            }
        />
    ); 
}

const renderDanhSachNhaKhoa = (navigation: any, dsNhakhoa: Array<NhaKhoaDeclareDto>) => {

    return (
        <FlatList 
            horizontal
            // pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // snapToAlignment="center"
            data={dsNhakhoa.reverse()}
            //extraData={this.state}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({item}) => {
                const timeNew = item.create_time === undefined ? 10000:(Date.now() - Date.parse(item.create_time))/1000;
                //console.log(`Props: ${JSON.stringify(timeNew)}`)
                const imageBg = item.image === undefined? 
                    (require('../../../assets/image/corona-virus.png'))
                    : ({uri: 'https://reactnative.dev/img/tiny_logo.png'})
                return (
                    <MCardView 
                        imgSrc={imageBg} 
                        title={item.name} 
                        description={item.address === undefined? '' : item.address } 
                        backgroundColor='rgba(89, 189, 189, 0.3)'
                        data={item}
                        addTagNew={timeNew<180?true:false}
                        onClick={data => navigation.navigate('TaoNhaKhoaScreen', data)}
                    />
                    
                );
            }}
            // onScroll={
            //     Animated.event([
            //         {
            //             nativeEvent: {contentOffset: {x: new Animated.Value(0)}}

            //         }
            //     ], {useNativeDriver: true})
            // }
        />
    );
}

function NhaKhoa() {
    const navigation = useNavigation(); 
    const [data, setData] = useState({ 
        dsNhaKhoa: [] ,
        dsSanPham: []
    });

    const [didMount, setDidMount] = useState(false); 
    let unmounted = false;

    useEffect( () => {
        
        // Using an IIFE
        (async function anyNameFunction() {
            setDidMount(true);

            if (!unmounted) {
                const dsNK = await getDsNhaKhoa();
                const dsSP = await getDsSanPham(); 

                setData({
                    dsNhaKhoa: dsNK,
                    dsSanPham: dsSP
                })
            }
            return () => { unmounted = true };
        })();
        
    }, [])

    const implementSearch = () => {
        navigation.goBack() //.navigate('Search', {user: 'dadas'}); 
    }

    if(!didMount) {
        return null;
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="rgba(0, 0, 0, 0.20)"
                animated
            />
            <MyHeader
                title={'Tìm kiếm công việc, thông báo '}
                gradient
                isHome
                size={Sizes.Small}
                isRight
                onClickRightIcon={() => {console.log('RRRR: ')}}
                onClickLeftIcon={implementSearch}
            />
        <ScrollView>
        <Block>
            


            <Block>
            { managerCreator.map((feature, i) => {
                return (
                    <MCardView 
                        key={`${i}`}
                        title ={feature.title}
                        description={feature.description}
                        backgroundColor={feature.backgroundColor}
                        imgSrc={feature.image}
                        data={null} //Tao nha khoa moi nen chua co data
                        onClick={(data) => {
                            navigation.navigate(feature.route, data);
                        }}
                    />
                )
            })}
            </Block>
            <Block flex={false}>
                <Text h2 bold style={{paddingTop: 20, paddingLeft:20}}>DS Nha Khoa</Text>
                {renderDanhSachNhaKhoa(navigation, data.dsNhaKhoa)} 
                            
            </Block>

            <Block flex={false}>
                <Text h2 bold style={{paddingTop: 20, paddingLeft:20}}>DS San Pham</Text>
                {renderDanhSachSanPham(navigation, data.dsSanPham)} 
                            
            </Block>
        </Block>
        </ScrollView>
        </>
        
    )
}

export default NhaKhoa;
