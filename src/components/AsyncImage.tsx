import React, { Component } from 'react'
import {
    Image,
    View
} from 'react-native';


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
    }
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
            source
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