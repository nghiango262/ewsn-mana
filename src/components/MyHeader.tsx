import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Text} from './react-ui';
import {theme} from '../constants';
import AsyncImage from '../components/AsyncImage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    onClickLeftIcon?: () => void;
    onClickRightIcon?: () => void;
    onClickRightIcon2?: () => void;
    onBack?: () => void;

}

const MyHeader = (props:IProps) => {
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
                    isHome? 
                    <TouchableOpacity
                        onPress={props.onClickLeftIcon}
                    >
                        {/* <Image 
                            source={require('../../assets/icon/search.png')}
                            style={{height:25, width:25}}
                            resizeMode="contain"
                        /> */}
                        <Icon name="search" color='#EAFAFA' size={25}/>
                        
                    </TouchableOpacity>
                    : 
                    <TouchableOpacity
                        onPress={props.onBack}
                    >
                        <Icon name="arrow-left" color='#EAFAFA' size={25}/>
                    </TouchableOpacity>
                }
                </Block>

                <Block style={styles.centerView}>
                    <TouchableOpacity
                        onPress={props.onClickLeftIcon}
                    >
                        <Text numberOfLines={1} title center color={styleColor}>{title}</Text>
                    </TouchableOpacity> 
                    
                </Block>

                <Block row flex={false} style={styles.rightView}>
                {props.onClickRightIcon2 && <TouchableOpacity style={styles.rightIcon}
                    onPress={props.onClickRightIcon2}
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
                {props.onClickRightIcon && <TouchableOpacity 
                        onPress={props.onClickRightIcon}
                        style={styles.rightIcon}
                    >
                        <Icon name="cog" color={color} size={25}/>
                    </TouchableOpacity> }
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

        justifyContent: 'center', 
        alignItems: 'center'
    },

    rightView: {
        //width: 60, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingRight: 15,
        //pad
    },

    rightIcon : {
        marginStart: 15
    }
});

export default MyHeader;
