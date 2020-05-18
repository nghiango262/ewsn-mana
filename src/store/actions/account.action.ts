import { IUser} from "../models/user.interface";
import { IAccount } from "../models/account.interface";

export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";
export const LOG_OUT_ACCOUNT: string = "LOG_OUT_ACCOUNT";

export function successLogin(account: IAccount): ILoginSuccessActionType {
    return { type: LOGIN_SUCCESS, account: account };
}

export function logOut(account: IAccount): ILogoutAccountActionType {
    return { type: LOG_OUT_ACCOUNT, account: account}
}

interface ILoginSuccessActionType { type: string, account: IAccount };
interface ILogoutAccountActionType { type: string, account: IAccount };