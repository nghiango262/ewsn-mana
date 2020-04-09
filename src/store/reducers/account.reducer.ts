import { IAccount } from "../models/account.interface";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/account.action";
import { IActionBase } from "../models/root.interface";
import {gVar} from '../../utils/globalVar';

const initialState: IAccount = gVar; 

function accountReducer(state: IAccount = initialState, action: IActionBase): IAccount {
    switch (action.type) {
        
        case LOGIN_SUCCESS: {  
            return { 
                ...state, 
                user: (action.account.user),
                accessToken: action.account.accessToken, 
                isLogin: action.account.isLogin
            };
        }
        case LOGIN_FAILURE: {
            return { 
                ...state, 
                user: (action.account.user),
                accessToken: '',
                isLogin: false
            };
        }
        default:
            return state;
    }
}


export default accountReducer;