import React from 'react';
import {
    TextInput
} from 'react-native'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Input, Text} from './react-ui';
import {theme} from '../constants';
import AsyncImage from '../components/AsyncImage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export enum Sizes{
    Small,
    Large
}

export interface IProps{
    title?: string;
    colorTitle?: string;
    size: Sizes;
    navigation?: any;
    isHome?: boolean;
    isRight?: boolean;
    ignoreStatusBar?: boolean;
    color?: string;
    gradient?: boolean;
    onClickRightIcon?: () => void
    onClickLeftIcon?: () => void
    onBack?: () => void

}

const SearchHeader = (props:IProps) => {
    const {
        gradient,   //tao hieu ung mau cho header
        ignoreStatusBar, //bo qua paddingTop 
        color, //mau cho header
        size, //kicj thuoc To va Nho
        isRight, //co icon right hay ko
        isHome, // Trang chinh hay trang phu, trang phu thi co nut tro ve home
        navigation,
        title,
        colorTitle 
    } = props;
    const styleColor = colorTitle? colorTitle:'#fff'
    //View container header
    const renderBase = () => {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    paddingTop: getStatusBarHeight(), 
                    height: (ignoreStatusBar? 0 : getStatusBarHeight()) + (size == Sizes.Large? 80: 50), 
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                    backgroundColor: color,
                    zIndex:1000
                }}
            >

                <Block flex={false} style={styles.leftView}>
                {
                    isHome? null
                    : 
                    <TouchableOpacity
                        onPress={props.onBack}
                    >
                        <Image 
                            source={require('../../assets/icon/back.png')}
                            style={{height:25, width:25}}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                }
                </Block>

                <Block style={styles.centerView}>
                    <TextInput
                        style={{
                            color: '#fff',
                            flex:1,
                            padding:8,
                            borderRadius:5,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }} 
                        defaultValue={''}
                        placeholder={'Tìm kiếm công việc, thông báo'}
                        placeholderTextColor={'#FAFAFA'}
                        onChangeText={(text: string) => {console.log(text)}}
                    />
                </Block>

                <Block flex={false} style={styles.rightView}>
                {isRight && <TouchableOpacity
                    onPress={props.onClickRightIcon}
                >
                    <AsyncImage
                        style={{
                            borderRadius: 1,
                            height: 25,
                            width: 25,
                        }}
                        source={
                            require('../../assets/icon/edit.png')
                        }
                        placeholderColor='#b3e5fc'/>
                </TouchableOpacity>}

                </Block>
            </View>
        );
    }

    //check xem co gradient hay ko?
    if (gradient)
        // tra ve View co chua gradient
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
                style={{zIndex:700}}
                colors={[theme.colors.primary, theme.colors.secondary]}
            >
                {renderBase()}
            </LinearGradient>
        );

    //Tra ve View ko co gradient
    return (
        <>
            {renderBase()}
        </>
    ); 
}

const styles = StyleSheet.create({
    container: {
        //height:(ignoreStatusBar? 0 : 25) + (size == Sizes.Large? 80: 50),  
    },

    leftView: {
        width: 60, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        paddingLeft: 15
    },

    centerView: {
        flexDirection: 'row',
        padding:5,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    rightView: {
        width: 60, 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
        paddingRight: 15
    }
});

export default SearchHeader;
