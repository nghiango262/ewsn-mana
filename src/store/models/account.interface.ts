import { IUser } from "./user.interface";

export interface IAccount {
    user: IUser;
    accessToken: string;
    isLogin: boolean;
    userPass?:string,
    fcmToken?: string;
    isNotFirst?: boolean;
    isNotConnected?: boolean;
}

