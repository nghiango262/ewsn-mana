import { IUser} from "../models/user.interface";
import { IAccount } from "../models/account.interface";

export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";

export function successLogin(account: IAccount): ILoginSuccessActionType {
    return { type: LOGIN_SUCCESS, account: account };
}

interface ILoginSuccessActionType { type: string, account: IAccount };
