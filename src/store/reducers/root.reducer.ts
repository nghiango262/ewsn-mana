import {combineReducers} from 'redux';
import accountReducer from './account.reducer';


const rootReducers = combineReducers({
    account: accountReducer
})

export default rootReducers;