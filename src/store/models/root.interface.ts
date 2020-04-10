import { IProduct, ProductModificationStatus } from "./product.interface";
//import { INotification } from "./notification.interface";
import { IUser } from "./user.interface";
import { IAccount } from "./account.interface";
import { ITask, TaskModificationStatus } from "./task.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    tasks: ITaskState;
    products: IProductState;
    //notifications: INotificationState;
    users: IUserState;
    //orders: IOrdersState;
    account: IAccount;
}

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    modificationState: ProductModificationStatus;
}

export interface ITaskState {
    tasks: ITask[];
    selectedTask: ITask | null;
    modificationState: TaskModificationStatus;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}


// export interface INotificationState {
//     notifications: INotification[];
// }

export interface IUserState {
    users: IUser[];
    admins: IUser[];
}