import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import {Block, Text} from './react-ui';
import { theme } from '../constants';
import AsyncImage from './AsyncImage';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IMCardProps {
    title: string
    description: string
    color?: string
    style?: any
    imgSrc: any,
    data: any,
    addTagNew?: boolean,
    onClick:(data:any)=>void
}

export class MCardView extends Component<IMCardProps,{}> {

    onChangePage(page: any) {
        this.props.onClick(page);
    }

    render() {
        const {  title, description, data, color, style, imgSrc, addTagNew, ...props } = this.props;

        console.log("data", data)
        const imageStyles = imgSrc?styles.image:{height:0,width:0};

        return (
            <TouchableOpacity onPress={() => this.onChangePage(data)} >
                <Block flex={false} color={color || theme.colors.white} style={styles.container} {...props}>
                    <AsyncImage source={imgSrc} style={styles.image} placeholderColor="white"/>
                    { addTagNew && <AsyncImage source={require('../../assets/image/new_tag_yellow.png')} style={styles.newTagImage} />}
                    <Block flex={false} bottom style={styles.content}>
                        <Text h2 white bold style={{padding: 8}} numberOfLines={1}>{title}</Text>
                        <Text grey style={{padding: 8}} numberOfLines={1}>{title}</Text>
                    </Block>
                </Block>
            </TouchableOpacity>
            
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.sizes.radius,
        marginLeft: 20,
        marginRight: 20,
        marginTop: theme.sizes.base/2,
        marginBottom: theme.sizes.base,
        backgroundColor: 'rgba(89, 189, 189, 0.3)',
        maxWidth: Dimensions.get('window').width -40,
        minHeight:60
    },
    content: {
        padding: 10,
    },

    card: {
        borderRadius: theme.sizes.radius,
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.18,
        // shadowRadius: 1.00,

        //elevation: 1,
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        padding:0,
        minWidth: 300,
        width: Dimensions.get('window').width - 50,
        height: 120,
    },
    newTagImage: {
        position: 'absolute',
        top:5,
        left:5,
        width:90,
        height:40
    }
})

