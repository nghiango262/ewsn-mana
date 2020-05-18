import React from 'react';
import {
    View,
    Text
} from 'react-native';

import Icomoon from 'react-native-vector-icons/FontAwesome';

const  Icon = (props:any) => {
    return (
        <View>
            <Icomoon 
                name={props.name}
                color={props.color}
                size={props.size}
            />
        </View>
    )
}

export default Icon;
