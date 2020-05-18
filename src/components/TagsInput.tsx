import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Tags from "react-native-tags";
import {Block, Text} from './react-ui';
import {theme} from '../constants';

interface ITagsInputProps {
    label?: string
    initialText?: string
    placeholder?: string
    initTags?: Array<string>
    containerStyle?: any
    inputStyle?: any 
    itemTagStyle?: any
    onViTriRang: (arr: string) => void
}

interface ITagsInputState {
    tags: Array<string>
}

export default class TagsInput extends Component<ITagsInputProps, ITagsInputState> {
    constructor(props: ITagsInputProps) {
        super(props);
        this.state = {
            tags: []
        }
    }
    renderLabel() {
        const { label } = this.props;
    
        return (
            <Block flex={false}>
                <TouchableOpacity
                    onPress={() => this.setState({})}
                >
                {label ? <Text gray2>{label}</Text> : null}
                </TouchableOpacity>
                
            </Block>
        )
    }
    render() {
        const {
            initialText,
            placeholder,
            initTags,
            containerStyle,
            inputStyle,
            itemTagStyle,
            ...props
        } = this.props

        const containerStyles = [
            styles.input,
            containerStyle,
        ];

        const itemTagStyles = [
            styles.itemTag,
            { borderColor: theme.colors.primary },
            itemTagStyle,
        ];
        
        const inputStyles = [
            {backgroundColor: 'white'},
            inputStyle
        ]

        const initialTags = initTags? initTags: [] 


        return (
            <Block margin={[theme.sizes.base, 0]}>
                {this.renderLabel()}
                <Tags
                    initialText={initialText||''}
                    textInputProps={{
                        placeholder: placeholder? placeholder:''
                    }}
                    initialTags={this.state.tags}
                    onChangeTags={(tags: any) => {
                        this.setState({tags: tags})
                        this.props.onViTriRang(tags)
                    }}
                    onTagPress={(index: number, tagLabel: string, event:any, deleted: any) =>
                        console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                    }
                        
                    containerStyle={containerStyles}
                    inputStyle={inputStyles}
                    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly } : any) =>  (
                        <TouchableOpacity key={`${index}`} onPress={onPress} style={itemTagStyles}>
                            <Text>{tag}</Text>
                        </TouchableOpacity>
                    )}
                    {...props}
                />
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.black,
        borderRadius: theme.sizes.radius,
        fontSize: theme.sizes.font,
        fontWeight: '500',
        color: theme.colors.black,
    },
    itemTag: {
        marginLeft: 3,
        elevation:3,
        padding: 5,
        marginRight: 5,
        marginBottom: 2,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderWidth:1,
        shadowRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 5,
        //flexDirection: "row",
        
    }
    
});
