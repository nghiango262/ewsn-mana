import React from 'react';
import {Block, Text, Button} from '../../components/react-ui';
import SearchHeader, { Sizes } from '../../components/SearchHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncImage from '../../components/AsyncImage';
import MyHeader from '../../components/MyHeader';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    imageButtonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width:100, height:100
    }
})
const Content = (navigation: any) => (
    <Block center>
        <Block center>
            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity 
                    style={{margin:5}}
                    onPress={() => Alert.alert('Red')}
                >
                    
                        <AsyncImage
                            style={{ 
                                width:100, height:100, 
                            }}
                            source={require('../../../assets/image/bt_red.png')}
                            placeholderColor='#b3e5fc'
                            centerLabel="QQQ"
                            
                        />
                    
                </TouchableOpacity>
                

                <TouchableOpacity 
                    style={{margin:5}}
                    onPress={() => Alert.alert('Yellow')}
                >
                    <AsyncImage
                        style={{ 
                            width:100, height:100, 
                        }}
                        source={require('../../../assets/image/bt_yellow.png')}
                        placeholderColor='#b3e5fc'
                        centerLabel="QQQ"
                    />
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                        style={{margin:5}}
                        onPress={() => Alert.alert('Blue')}
                >
                    <AsyncImage
                            style={{ 
                                width:100, height:100, 
                            }}
                            source={require('../../../assets/image/bt_blue.png')}
                            placeholderColor='#b3e5fc'
                            centerLabel="QQQ"
                    />
                </TouchableOpacity>
                
                <TouchableOpacity 
                        style={{margin:5}}
                        onPress={() => Alert.alert('Green')}
                >
                    <AsyncImage
                            style={{ 
                                width:100, height:100,
                            }}
                            source={require('../../../assets/image/bt_green.png')}
                            placeholderColor='#b3e5fc'
                            centerLabel="QQQ"
                    />
                </TouchableOpacity>
            </View>
        </Block>
    </Block>
);

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
            {Content(navigation)}
        </>
    )
}

export default MenuSetting;
