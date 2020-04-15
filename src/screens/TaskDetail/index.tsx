import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import {getTasks} from '../../services/api'
import { getTaskList } from '../../store/actions/task.action';
import { ITaskState, IStateType } from '../../store/models/root.interface';
import { ITask } from '../../store/models/task.interface';
import { FlatList, Animated, StyleSheet, Platform, Dimensions, RefreshControl, View } from 'react-native';
import { MCardView } from '../../components/MCardView';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HEADER_MAX_HEIGHT = 250;
export const HEADER_MIN_HEIGHT = 50 + getStatusBarHeight();
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export const renderMyWorks = (tasks:ITask[]) => {
    if (!tasks || tasks.length < 1) 
        return <></>;
    
    //
    return (
        <FlatList 
            //horizontal
            // pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            // snapToAlignment="center"
            data={tasks}
            //extraData={tasks}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({item}) => {
                return (
                    <MCardView 
                        imgSrc={require('../../../assets/image/intro_work_3.png')} 
                        title={item.title} 
                        description={''} 
                        data={item} 
                        onClick={data => console.log(data)}
                    />
                    
                );
            }}
            onScroll={() =>
                Animated.event(
                    [{
                        nativeEvent: {contentOffset: {x: new Animated.Value(0)}},
                    },], 
                    {useNativeDriver: true}
                )
            }
        />
    );
}

const TaskDetail = () => {
    const dispatch:Dispatch<any> = useDispatch();
    const tasks: ITask[] = useSelector((state: IStateType) => state.tasks.tasks);
    console.log('TASK_SCREEN: ',JSON.stringify(tasks, null, 2));
    useEffect(() => {
        //componentDidmount
        //requestApTasks()

        return () => {
            // componentDidUnmount
        }
    }, [])

    const requestApiGetOneTask = async () => {
        const taskResponse = await getTasks();
        dispatch(getTaskList(taskResponse))
    }

    

    return (
        <Block>
            <MyHeader
                title={'Tasks'}
                gradient
                isHome
                size={Sizes.Small}
                isRight
                onClickRightIcon={() => {console.log('RRRR: ')}}
            />
            <Block>
                {renderMyWorks(tasks)}
            </Block>
        </Block>
    )
}


export const MTempScreen = (props:any) => {
    const {children, onRefresh} = props;

    let scrollY =new Animated.Value(0);
    const [refreshing, setRefreshing] = useState(false)
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.8],
        extrapolate: 'clamp',
    });

    const titleTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
    });

    return ( 
        <Block>
            <Animated.ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // <-- Add this
                )}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh
                    }
                    // Android offset for RefreshControl
                    progressViewOffset={HEADER_MAX_HEIGHT}
                    />
                }
                // iOS offset for RefreshControl
                contentInset={{
                    top: HEADER_MAX_HEIGHT,
                }}
                contentOffset={{
                    y: -HEADER_MAX_HEIGHT,
                }}
            >
                <View style={styles.scrollViewContent}>
                    {children}
                </View>
                
            </Animated.ScrollView>

            <Animated.View style={[styles.header, {height: headerHeight}]}>
                
                <Animated.Image
                    style={[
                    styles.backgroundImage,
                    {
                        opacity: imageOpacity,
                        transform: [{ translateY: imageTranslate }],
                    },
                    ]}
                    source={require('../../../assets/image/intro_work_3.png')}
                />
                <Animated.View
                    style={[
                        styles.bar,
                        {
                        transform: [
                            { scale: titleScale },
                            { translateY: titleTranslate },
                        ],
                        },
                    ]}
                    >
                    <Text h1 bold white>TASKS</Text>
                </Animated.View>
                <MyHeader title={''} isHome size={Sizes.Small} isRight={true}  onClickRightIcon={() => {console.log('Header clicked right icon')}}/>
            </Animated.View>
            
        </Block>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        //zIndex: Platform.OS === 'ios' ?10:-1,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: getStatusBarHeight(),
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        elevation:3
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
    scrollViewContent: {
        marginTop: Platform.OS === 'ios' ?10: HEADER_MAX_HEIGHT + 10,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: Dimensions.get('window').width,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    // flatlistView: {
    //     //flex:1,
    //     backgroundColor: 'transparent',
    //     marginTop: Platform.OS === 'ios' ?10: HEADER_MAX_HEIGHT,
        
    // },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default TaskDetail;
