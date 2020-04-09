import { IUser } from "../models/user.interface";

export const GET_USERS: string = "GET_USERS";
export const ADD_ADMIN: string = "ADD_ADMIN";
export const REMOVE_ADMIN: string = "REMOVE_ADMIN";

export function getListUsers(users: IUser[]): IGetUsersActionType {
    return { type: GET_USERS, users: users };
}

export function addAdmin(user: IUser): IAddAdminActionType {
    return { type: ADD_ADMIN, user: user };
}

export function removeAdmin(user: IUser): IRemoveAdminActionType {
    return { type: REMOVE_ADMIN, user: user };
}

interface IGetUsersActionType { type: string, users: IUser[] }
interface IAddAdminActionType { type: string, user: IUser };
interface IRemoveAdminActionType { type: string, user: IUser };
