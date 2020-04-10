import {combineReducers} from 'redux';
import accountReducer from './account.reducer';
import tasksReducer from './task.reducer'


const rootReducers = combineReducers({
    account: accountReducer,
    tasks: tasksReducer
})

export default rootReducers;