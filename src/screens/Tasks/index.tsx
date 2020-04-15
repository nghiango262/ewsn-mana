import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Block, Text, Button} from '../../components/react-ui';
import MyHeader, { Sizes } from '../../components/MyHeader';
import {getTasks} from '../../services/api'
import { getTaskList } from '../../store/actions/task.action';
import { ITaskState, IStateType } from '../../store/models/root.interface';
import { ITask } from '../../store/models/task.interface';
import { FlatList, Animated } from 'react-native';
import { MCardView } from '../../components/MCardView';
import { MTempScreen } from '../TaskDetail';
import ContentLoader, {InstagramLoader} from "react-native-easy-content-loader";


//Ham render ds Task 
const renderMyWork = (tasks: ITask[]) => {
    if (!tasks || tasks.length < 1) 
        return <></>;
    return (
        tasks.map((task, index) => {
            return (
                <MCardView 
                    key={`${index}`}
                    imgSrc={require('../../../assets/image/intro_work_3.png')} 
                    title={task.title} 
                    description={''} 
                    data={task} 
                    onClick={data => console.log(data)}
                />
            );
        })
    );

} 

const renderLoader = () => {
    return (
        <ContentLoader pRows={1} pWidth={'100%'} pHeight={80} listSize={10}/>
        
    );

}

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

const Tasks = () => {
    const dispatch:Dispatch<any> = useDispatch();
    const [loading, setLoading] = useState(false);
    const tasks: ITask[] = useSelector((state: IStateType) => state.tasks.tasks);
    console.log('TASK_SCREEN: ',JSON.stringify(tasks, null, 2));
    useEffect(() => {
        //componentDidmount
        setLoading(true)
        requestApTasks()

        return () => {
            // componentDidUnmount
        }
    }, [])

    const requestApTasks = async () => {
        const taskResponse = await getTasks();//get API => Tasks
        console.log('TASK_SCREEN (taskResponse): '); 
        dispatch(getTaskList(taskResponse))
        setLoading(false)
    }

    return (
        <MTempScreen onRefresh={requestApTasks}>
            {loading? renderLoader() : renderMyWork(tasks)  }
        </MTempScreen>
    );

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

export default Tasks;
