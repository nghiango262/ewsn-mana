import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Input, Text} from '../components/react-ui'
import TagsInput from '../components/TagsInput';
import { ProductDeclareDto } from '../services/interface';
import { theme } from '../constants';
import AsyncImage from './AsyncImage';

interface ISanPhamProps {
    data: ProductDeclareDto
    onRangVaVitri: (vitri: string) =>void
    onRemove: () => void
}

interface ISanPhamState {
    id: string,
    name: string,
    description: string,
    price: string,
    nhaCungCap: string
    thoiGianBaoHanh: string

}


export default class SanPhamView extends Component<ISanPhamProps, ISanPhamState> {
    constructor(props:ISanPhamProps) {
        super(props);
        const {id, name, description, price, nhaCungCap, thoiGianBaoHanh} = this.props.data; 
        this.state = {
            id: id,
            name: name,
            description: description,
            price: price === undefined? 0: price.toString(),
            nhaCungCap: nhaCungCap,
            thoiGianBaoHanh: thoiGianBaoHanh===undefined? 0 : thoiGianBaoHanh.toString()
        } as ISanPhamState
    }
    render() {
        const { data } = this.props;
        return (
            <Card>
                
                <View style={{
                    position:'absolute', 
                    zIndex: 1000, 
                    height:40, 
                    width:40, 
                    top:5, 
                    right:5, 
                }}>
                    <TouchableOpacity onPress={() => this.props.onRemove()}>
                        <AsyncImage 
                            source={require('../../assets/icon/edit.png')}
                            style={{
                                height:30,
                                width:30
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
                        <Text h2 center bold primary>{data.name}</Text>
                        <TagsInput 
                            label={'Răng và vị trí '} 
                            containerStyle={styles.input}
                            onViTriRang={(tags) => {this.props.onRangVaVitri(tags)}}
                        />
                        
                        <Input 
                            label="Price"
                            style={styles.input}
                            defaultValue={this.state.price}
                            onChangeText={(text: string) => this.setState({ price: text})}
                        />
                        
                        <Input 
                            label="nhà cung cấp"
                            style={styles.input}
                            defaultValue={this.state.nhaCungCap}
                            onChangeText={(text: string) => this.setState({ nhaCungCap: text})}
                        />
                        <Input 
                            label="Thời gian bảo hành"
                            style={styles.input}
                            defaultValue={this.state.thoiGianBaoHanh}
                            onChangeText={(text: string) => this.setState({ thoiGianBaoHanh: text})}
                        /> 
                    </Card>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})
