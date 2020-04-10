import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {Block, Text, Button, Input} from '../../components/react-ui';
import SearchHeader, { Sizes } from '../../components/SearchHeader';
import * as RootNavigation from '../../navigation/RootNavigation';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { TabView, TabBar, ScrollPager } from 'react-native-tab-view';
import { IStateType, ITaskState } from 'src/store/models/root.interface';
import { ITask } from 'src/store/models/task.interface';


const AllRoute = () => {
    return (
        <Block style={[styles.scene, { backgroundColor: 'transparent' }]}>

        </Block>
    );
}

const WorkRoute = () => {
    const task: ITaskState = useSelector((state: IStateType) => state.tasks);
    return (
        <Block style={[styles.scene, { backgroundColor: '#transparent' }]}>

        </Block>
    );
}

const NhanVienRoute = () => (
    <Block style={[styles.scene, { backgroundColor: '#transparent' }]}>

    </Block>
);

const KhacRoute = () => (
    <Block style={[styles.scene, { backgroundColor: '#transparent' }]}>

    </Block>
)

const SanPham = () => (
    <Block style={[styles.scene, { backgroundColor: '#transparent' }]}>

    </Block> 
)

const BaoHanh = () => (
    <Block style={[styles.scene, { backgroundColor: '#transparent' }]}>

    </Block> 
)

const Search = (props:any) => {
    const { navigation} = props;
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Tất cả' },
        { key: 'second', title: 'Công việc' },
        { key: 'third', title: 'Nhân viên' },
        { key: 'sanpham', title: 'Sản phẩm' },
        { key: 'baohanh', title: 'Bảo hành' }, 
        { key: 'other', title: 'Khác' },
    ]);

    const renderScene = (props: any)  => {
        const {route} = props;
        switch (route.key) {
            case 'first':
                return <AllRoute />;
            case 'second':
                return <WorkRoute />;
            case 'third':
                return <NhanVienRoute />;
            case 'other':
                return <KhacRoute />;
            case 'baohanh':
                return <BaoHanh />
            default:
                return null;
        }
    };

    // const renderScene = SceneMap({
    //     first: AllRoute,
    //     second: WorkRoute,
    //     third: NhanVienRoute,
    //     fourth: KhacRoute 
    // });

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{width: 'auto', backgroundColor: '#fff' }}
            labelStyle = {{color: '#000'}}
            scrollEnabled = {true}
        />
    );

    const initialLayout = { height: 0,width: Dimensions.get('window').width };

    const contentView = (): JSX.Element =>  (
        <TabView
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            //renderPager={props => <ScrollPager { ...props }/>}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            navigationState={{ index, routes }}
            
        />
            
    );
    

    return (  //Screen View
        <>
            <SearchHeader
                gradient
                isHome={false}
                size={Sizes.Small}
                isRight
                navigation={navigation}
                onClickRightIcon={() => {console.log('RRRR: ')}}
                onBack={() => RootNavigation.resetTo(RootNavigation.ERouteName.Home)}
            />
            <Block>
                {contentView()}
            </Block>
        </>
    )
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

export default Search;
