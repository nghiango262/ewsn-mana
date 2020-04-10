import { IUser } from "./user.interface";

export enum TaskStatus {
    OPEN ='OPEN',
    DONE ='DONE'
}

export interface ITask {
    id: string;
    title:string;
    name:string;
    description: string;
    status: TaskStatus;
    manager: IUser;
    employee: IUser

    //managerthoi gian tao Task
    create_time: Date;

    //USER thời gian bắt đầu công việc khi user nhan task
    begin_time: Date;

    //USER- thời gian cập nhật công việc
    update_time: Date;

   //manager: Thời gian deadline task
    deadline: Date;

    //USER: Thời gian task
    end_time: Date;
}

export enum TaskModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}