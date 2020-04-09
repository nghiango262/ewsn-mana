import { User } from "../services/interface";
import { setObjectForKey, getObjectForKey, removeObjectForKey } from "./deviceStorage";
import { IUser } from "../store/models/user.interface";
import { IAccount } from "src/store/models/account.interface";

export var gVar: IAccount = {
    user: {
        userId: '',
        username: '',
        password: '',
        fullname: '',
        role:''
    },
    accessToken: '',
    fcmToken: '',
    isLogin: false,
    isNotFirst: false,
    isNotConnected: false //mac dinh dang ket noi
}

export const gDefautVar: IAccount = {
    user: {
        userId: '',
        username: '',
        password: '',
        fullname: '',
        role:''
    },
    accessToken: '',
    fcmToken: '',
    isLogin: false,
    isNotFirst: false,
    isNotConnected: false //mac dinh dang ket noi
}

export function saveStateLogin(gVar: IAccount) {
    const authStorage = {
        key: 'UserLogin',
        object: gVar
    }
    setObjectForKey(authStorage);
}

export async function getStateLoginForgVar(): Promise<IAccount> {
    const userLogin = await getObjectForKey('UserLogin').catch((err: any) => console.log(err))
    Object.assign( gVar, userLogin);
    return gVar;
}

export async function removeUserInfo() {
    await removeObjectForKey('UserLogin')
}