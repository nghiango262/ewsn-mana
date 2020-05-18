

import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions} from 'react-native';
import Base from '../Base';
import MyHeader, { Sizes } from '../../components/MyHeader'
import {Block, Text, Button, Input, Card} from '../../components/react-ui';
import {gVar} from '../../utils/globalVar';
import {theme} from '../../constants';
//import {Picker} from '@react-native-community/picker';
import RNPicker from "rn-modal-picker";
import {getDsNhaKhoa, getDsSanPham, khaiBaoBaoHanh} from '../../services/api';
import { TaskStatusDto, ProductDeclareDto, BaoHanhDeclareDto, RangDeclareDto } from '../../services/interface';
import SanPhamView from '../../components/SanPhamView';


interface INhaKhoaProps {
    navigation: any,
    route:any
}

interface INhaKhoaState {
    loading: boolean;

    //thong tin benh nhan
    tenBenhNhan: string;
    ngaySinhBN: string;
    sdtBenhNhan: string;

    //Thong tin bac si
    tenBacSi: string;
    sdtBacSi: string;

    //Thong tin san pham (Rang)
    loaiPhucHinh: string;
    loaiRang: string;
    mauRang: string;
    rang: Array<string>;

    //
    maTheNhaCungCap: string;
    thoiGianBaoHanh: string;

    dsNhaKhoa: Array<NhaKhoa>;
    dsSanPham: Array<ProductDeclareDto>
    placeHolderNhaKhoaName: string;
    selectedNhaKhoa: any;

    dsSanPhamBaoHanh: Array<ProductDeclareDto>

}

type NhaKhoa = {
    id: number,
    name: string,
    address: string,
    hotline:string
}



class KhaiBaoNhaKhoa extends Base<INhaKhoaProps, INhaKhoaState> {
    
    
    constructor(props: INhaKhoaProps) {
        super(props);
        this.state = {
            loading: false,
            //thong tin benh nhan
            tenBenhNhan: 'Benh Nhan A',
            ngaySinhBN: '2000-10-23',
            sdtBenhNhan: '03902082023',

            //Thong tin bac si
            tenBacSi: 'Bac Si VKL',
            sdtBacSi: '02934820420',

            //Thong tin san pham (Rang)
            loaiPhucHinh: 'CO_DINH',
            loaiRang: 'RANG_VANG',
            mauRang: 'Tim Mong Mo',
            rang: [],

            //
            maTheNhaCungCap: '883283',
            thoiGianBaoHanh: '1',
            dsNhaKhoa: [],
            dsSanPham: [],
            placeHolderNhaKhoaName: "Chọn nha khoa",
            selectedNhaKhoa: { id: '', name: ''},
            dsSanPhamBaoHanh: []

        }
        
    }

    reloadData = () => {

    }

    async componentDidMount() {
        const dsNK = await getDsNhaKhoa();
        const dsSP = await getDsSanPham(); 

        this.setState({
            dsNhaKhoa: dsNK,
            dsSanPham: dsSP 
        })

    }


    renderNhaKhoaPicker = () => {
        return (
            <RNPicker
                dataSource={this.state.dsNhaKhoa}
                dummyDataSource={this.state.dsNhaKhoa}
                defaultValue={false}
                pickerTitle={"Chọn Nha khoa: "}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Tìm....."}
                showPickerTitle={true}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={this.state.selectedNhaKhoa.name}
                placeHolderLabel={this.state.placeHolderNhaKhoaName}
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                //dropDownImage={require("./res/ic_drop_down.png")}
                selectedValue={(index: number, item: any) => {
                    this.setState({ selectedNhaKhoa: {id: item.id , name: item.name }})
                }}
            />
        );
    }

    renderSanPhamPicker = () => {
        return (
            <RNPicker
                dataSource={this.state.dsSanPham}
                dummyDataSource={this.state.dsSanPham}
                defaultValue={false}
                pickerTitle={"Chọn SP: "}
                showSearchBar={true}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Tìm....."}
                showPickerTitle={false}
                searchBarContainerStyle={styles.searchBarContainerStyle}
                pickerStyle={{
                    width: Dimensions.get('window').width -30, 
                    backgroundColor: '#fff',
                    justifyContent:'center',
                    alignItems:'center',
                    padding: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                }}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={'Them san pham'}
                placeHolderLabel={'Chon san pham'}
                selectLabelTextStyle={{
                    color: "#000",
                    backgroundColor:'yellow',
                    textAlign: "center",
                    justifyContent:"center"
                }}
                placeHolderTextStyle={{
                    color: "#000",
                    textAlign: "center",
                }}
                //dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={null}
                selectedValue={(index: number, item: any) => {
                    
                    const dsSanPhamTam = this.state.dsSanPhamBaoHanh
                    dsSanPhamTam.push(item)
                    this.setState({
                        dsSanPhamBaoHanh: dsSanPhamTam 
                    })
                }}
            />
        );
    }

    removeSapPhamChon = (index: number) => {
        console.log('Vi tri', index)
        const arrTemp = this.state.dsSanPhamBaoHanh;
        if (index > -1) {
            arrTemp.splice(index, 1);
        }
        this.setState({
            dsSanPhamBaoHanh: arrTemp 
        })
    }

    capNhatVitriVaSoRang = (arrRang: any, index: number) => {
        console.log(arrRang) 
        const arrTemp = this.state.dsSanPhamBaoHanh;
        if (index > -1) {
            arrTemp[index].viTri = arrRang;
            console.log(arrTemp[index].viTri)
        }
        this.setState({
            dsSanPhamBaoHanh: arrTemp 
        })

        console.log(JSON.stringify(this.state.dsSanPhamBaoHanh, null, 2))
    }

    createPhieuBaoHanh = async () => {
        const {selectedNhaKhoa, tenBenhNhan, sdtBenhNhan, ngaySinhBN, tenBacSi, sdtBacSi, dsSanPhamBaoHanh} = this.state;
        const listSanPham: Array<any> = [];
        dsSanPhamBaoHanh.forEach(sp => {
            if (sp.viTri === null || sp.viTri === undefined || sp.viTri.length <= 0) {
                Alert.alert('LOI', `Vui long chon so luong va vi tri cho ${sp.name}`);
                return; 
            }
            listSanPham.push({
                id: sp.id,
                viTriRang: sp.viTri
            })
        })
        const body: BaoHanhDeclareDto = {
            nhakhoa: selectedNhaKhoa,
            tenbenhnhan: tenBenhNhan,
            ngaysinhbn: ngaySinhBN,
            sdtbenhnhan: sdtBenhNhan,
            tenbacsi: tenBacSi,
            sdtbacsi: sdtBacSi,
            listSanPham:listSanPham 
        }

        if (selectedNhaKhoa.id <= 0) {
            Alert.alert('LOI', 'Vui long doi chon nha khoa bao hanh');
            return;
        }

        if (listSanPham.length <= 0) {
            Alert.alert('LOI', 'Vui long doi chon san pham bao hanh');
            return;
        }
        //console.log(JSON.stringify(body, null, 2)) 
        this.setState({loading: true})
        const response = await khaiBaoBaoHanh(body);
        //console.log(JSON.stringify(response, null, 2)) 
        if (!response.isAction) {
            Alert.alert('OK buoc dau', 'Vui long doi xac nhan ben nha khoa')
        } else {
            Alert.alert('OK', 'San pham duoc kich hoat bao hanh thanh cong') 
        }
        this.setState({loading: false})
    }

    renderContent = () => {
        //const {title} = this.props.navigation.route.params;
        //const task = this.props.route.params;
        
        return (
            <KeyboardAvoidingView style={{flex:1}} behavior="padding">
                
            <Block>
                <ScrollView keyboardShouldPersistTaps='handled'>
                <Block middle padding={[0,15]}>
                    <Text h2 bold style={{paddingBottom: 10, paddingTop:10}}>Nha khoa</Text>
                    <Card>
                        {this.renderNhaKhoaPicker()}
                    </Card>

                    <Text h2 bold style={{paddingBottom: 10, paddingTop:15}}>Khách hàng (bệnh nhân)</Text>
                    <Card>
                        <Input 
                            label="Tên bệnh nhân"
                            style={styles.input}
                            defaultValue={this.state.tenBenhNhan}
                            onChangeText={(text: string) => this.setState({ tenBenhNhan: text})}
                        />
                        <Input 
                            label="Ngày tháng năm sinh"
                            style={styles.input}
                            defaultValue={this.state.ngaySinhBN}
                            onChangeText={(text: string)  => this.setState({ ngaySinhBN: text})}
                        />
                        <Input 
                            label="Số điện thoại"
                            style={styles.input}
                            defaultValue={this.state.sdtBenhNhan}
                            onChangeText={(text: string)  => this.setState({ sdtBenhNhan: text})}
                        />
                    </Card>

                    <Text h2 bold style={{paddingBottom: 10, paddingTop:15}}>Nhân viên (Bác sĩ)</Text>
                    <Card>
                        <Input 
                            label="Tên bác sĩ"
                            style={styles.input}
                            defaultValue={this.state.tenBacSi}
                            onChangeText={(text: string)  => this.setState({ tenBacSi: text})}
                        />
                        
                        <Input 
                            label="Số điện thoại"
                            style={styles.input}
                            defaultValue={this.state.sdtBacSi}
                            onChangeText={(text: string)  => this.setState({ sdtBacSi: text})}
                        />
                    </Card>

                    <Block flex={false} style={{paddingBottom: 10, paddingTop:15}}>
                        <Text h2 bold>Sản phẩm</Text>
                        
                    </Block>

                    
                    
                    {this.state.dsSanPhamBaoHanh.map((sp, index) => {
                        return (
                            <SanPhamView 
                                data={sp}
                                onRemove={() => this.removeSapPhamChon(index)}
                                onRangVaVitri={(viTriRang: any) => {
                                    this.capNhatVitriVaSoRang(viTriRang,index)
                                }}
                            />
                        );
                    })}
                    {this.renderSanPhamPicker()}
                    
                
                <Button gradient onPress={() => this.createPhieuBaoHanh()}>
                    <Text bold white center>Send</Text>
                </Button>
                </Block>
                </ScrollView>
            </Block>
            </KeyboardAvoidingView>
            
        );
    }
    renderHeader = () => {
        const {navigation} = this.props;
        return (
            <View>
                <MyHeader 
                    title={'KHAI BÁO NHA KHOA'} 
                    color={'#04B45F'}
                    size={Sizes.Small} 
                    isHome={false} 
                    isRight
                    navigation={navigation}
                    onClickRightIcon={() => navigation.navigate('Scan')}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    input:{
        //backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    itemSeparatorStyle:{
        height: 1,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#D3D3D3"
    },
    searchBarContainerStyle: {
        marginBottom: 10,
        flexDirection: "row",
        height: 40,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10
    },
    
    selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
    },
    placeHolderTextStyle: {
        color: "#D3D3D3",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row"
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center"
    },
    listTextViewStyle: {
        color: "#000",
        marginVertical: 10,
        flex: 0.9,
        marginLeft: 20,
        marginHorizontal: 10,
        textAlign: "left"
    },
    pickerStyle: {
        marginLeft: 10,
        //elevation:3,
        paddingRight: 25,
        marginRight: 10,
        marginBottom: 2,
        // shadowOpacity: 1.0,
        // shadowOffset: {
        //     width: 1,
        //     height: 1
        // },
        //borderWidth:1,
        //shadowRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        //shadowColor: "#d3d3d3",
        //borderRadius: 5,
        flexDirection: "row",
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
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
})

export {KhaiBaoNhaKhoa}
