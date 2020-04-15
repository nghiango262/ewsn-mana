import React, { Component } from 'react'
import {
    Image,
    View,
    StyleSheet
} from 'react-native';
import { Text } from './react-ui';


type Style = number | string | Object | Array<Style>

interface Props {
    placeholderColor?: string,
    style: {
        width: number,
        height: number,
        [key: string]: Style
    },
    source: {
        uri: string
    },
    centerLabel?: string
}

interface State {
    loaded: boolean
}

export default class AsyncImage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { loaded: false }
    }

    render() {
        const {
            placeholderColor,
            style,
            source,
            centerLabel
        } = this.props
    
        return (
            <View style={style}>
    
            <Image
                source={source}
                resizeMode={'contain'}
                style={[
                    style,
                    {
                        position: 'absolute',
                        resizeMode: 'contain'
                    }
                ]}
                onLoad={this._onLoad} />
            
            {centerLabel? <View
                style={[
                    style,
                    {
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                    }
                ]} >
                    <Text h2 white bold>{centerLabel}</Text>
                </View> : null
            }
    
            {!this.state.loaded &&
                <View
                style={[
                    style,
                    {
                    backgroundColor: placeholderColor || '#90a4ae',
                    position: 'absolute'
                    }
                ]} />
            }
            </View>
        )
    }

    _onLoad = () => {
        this.setState(() => ({ loaded: true }))
    }
}

const styles = StyleSheet.create({
    container: {

    }
})