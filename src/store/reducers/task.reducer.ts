
import { IActionBase, ITaskState } from "../models/root.interface";
import {gVar} from '../../utils/globalVar';
import { TaskModificationStatus } from "../models/task.interface";
import { GET_TASK_LIST } from "../actions/task.action";

const initialState: ITaskState = {
    tasks: [],
    selectedTask: null,
    modificationState: TaskModificationStatus.None
}; 

function tasksReducer(state: ITaskState = initialState, action: IActionBase): ITaskState {
    switch (action.type) {
        
        case GET_TASK_LIST: {  
            return { 
                ...state, 
                tasks: (action.tasks),
                selectedTask: null,
                modificationState: TaskModificationStatus.None
            };
        }
        
        default:
            return state;
    }
}

export default tasksReducer;