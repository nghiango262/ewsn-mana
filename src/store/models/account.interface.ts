import { IUser } from "./user.interface";

export interface IAccount {
    user: IUser;
    accessToken: string;
    isLogin: boolean;
    fcmToken?: string;
    isNotFirst?: boolean;
    isNotConnected?: boolean;
}

