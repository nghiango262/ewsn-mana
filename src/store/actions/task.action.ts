import { ITask } from "../models/task.interface";

export const GET_TASK_LIST: string = "GET_TASK_LIST";
export const TASK_LIST_FAILURE: string = "TASK_LIST_FAILURE";

export function getTaskList(tasks: ITask[]): ITaskListActionType {
    return { type: GET_TASK_LIST, tasks: tasks };
}

interface ITaskListActionType { type: string, tasks: ITask[] };
