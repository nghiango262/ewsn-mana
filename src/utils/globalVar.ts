import { User } from "../services/interface";
import { setObjectForKey, getObjectForKey, removeObjectForKey } from "./deviceStorage";


export var gVar: User = {
    userId: '',
    username: '',
    password: '',
    display_user: '',
    accessToken: '',
    fcmToken: '',
    avatarLink: '',
    isActive: false,
    isNotFirst: false,
    isNotConnected: false //mac dinh dang ket noi
}

export const gDefautVar: User = {
    userId: '', 
    username: '',
    password: '',
    display_user: '',
    accessToken: '',
    fcmToken: '',
    avatarLink: '',
    isActive: false,
    isNotFirst: false,
    isNotConnected: false 
}

export function saveStateLogin(gVar: User) {
    const authStorage = {
        key: 'UserLogin',
        object: gVar
    }
    setObjectForKey(authStorage);
}

export async function getStateLoginForgVar(): Promise<User> {
    const userLogin = await getObjectForKey('UserLogin').catch((err: any) => console.log(err))
    Object.assign( gVar, userLogin);
    return gVar;
}

export async function removeUserInfo() {
    await removeObjectForKey('UserLogin')
}