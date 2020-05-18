import {post, get, patch} from './http';
import {Platform} from 'react-native';

import {apiConfig} from '../config';
import { 
    LoginDto, 
    CreateNotifyDto,
    CreateNotifyTaskDto,
    TaskStatusDto,
    NhaKhoaDeclareDto,
    ProductDeclareDto,
    BaoHanhDeclareDto 
} from './interface';
const apiLogin = `${apiConfig.baseUrl}/auth/signin`;
const apiTasks = `${apiConfig.baseUrl}/tasks`;
const apiMyTask = `${apiConfig.baseUrl}/tasks/mytask`; 
const apiNotify = `${apiConfig.baseUrl}/notification`;
const apiNhaKhoa = `${apiConfig.baseUrl}/nhakhoa`; 
const apiProduct = `${apiConfig.baseUrl}/product`;
const apiBaoHanh =  `${apiConfig.baseUrl}/phieubaohanh`;
const apiTraCuuBaoHanh = `${apiConfig.baseUrl}/patient/baohanh`; 

export function login(credentials: LoginDto){
    return post(apiLogin, credentials);
}

export function createNotification(body: CreateNotifyDto) {
    return post(apiNotify, body)
}

export function createNotifyTask(body: CreateNotifyTaskDto) {
    return post(apiTasks, body)
}

export function updateTaskStatus(id: string, body: TaskStatusDto) {
    const url = `${apiTasks}/${id}/status`;
    return patch(url, body);
}

export function getTasks(): Promise<any>{
    return get(apiTasks);
}

export function getMyTask(userId: string) {
    const url = `${apiMyTask}/${userId}`
    return get(url)
}

export function createTask(title: string, description: string) {
    let data ={
        title: title,
        description: description
    }
    return post(apiTasks,data);
}

export function getDsNhaKhoa() {
    return get(apiNhaKhoa);
}

export function createNewNhaKhoa(body: NhaKhoaDeclareDto) {
    return post(apiNhaKhoa, body)
}

export function getDsSanPham() {
    return get(apiProduct);
}

export function createNewProduct(body: ProductDeclareDto) {
    return post(apiProduct, body)
}

export function khaiBaoBaoHanh(body: BaoHanhDeclareDto) {
    return post(apiBaoHanh, body)
}

export function traCuuBaoHanh(code: string) {
    const url = `${apiTraCuuBaoHanh}/${code}`
    return get(url);
}