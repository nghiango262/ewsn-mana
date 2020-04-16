import {Dispatch} from 'react'
import axios from 'axios';
import { removeObjectForKey, getObjectForKey, setObjectForKey} from '../utils/deviceStorage';
import { User, LoginDto } from './interface';
//import { login } from './api';
import {gVar, getStateLoginForgVar, saveStateLogin} from '../utils/globalVar';
import { useDispatch } from "react-redux";
import { IAccount } from '../store/models/account.interface';
import { successLogin } from '../store/actions/account.action';
import { Platform } from 'react-native';

function createHeader() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + gVar.accessToken
    }
}

export async function post(url: string, data: any){
    console.info(url);
    console.info(data)
    try {
        let response = await axios(url, {
            method: 'POST',
            headers: createHeader(),
            data: data
        });
        return response.data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.warn(`Response (SyntaxError) ${error}`)
        } else {
            console.log(`Response ${JSON.stringify(error.response)}`)
        }
        if(error.response.data.statusCode === 401) {
            if (loginCount>3) return Promise.reject(`LOGIN QUA NHIEU - KHONG GUI DUOC MESSAGE`) 
            return await requestLogin();
        } else
        return Promise.reject(error.response);
    }
}

export async function get(url: string): Promise<any>{
    console.info(url);
    try {
        let response = await axios(url, {
            method: 'GET',
            headers: createHeader()
        });
        return response.data;
    } catch (error) {
        console.debug(`Response: ${error}`)
        // if (error instanceof SyntaxError) {
        //     console.log(`Response (SyntaxError) ${error}`)
        // } else {
        //     console.log(`Response ${JSON.stringify(error.response)}`)
        // }
        if(error.response.data.statusCode === 401) {
            if (loginCount>3) return Promise.reject(`LOGIN QUA NHIEU - KHONG GUI DUOC MESSAGE`) 
            return await requestLogin();
        } else {
            return Promise.reject(`KHONG GUI DUOC MESSAGE:  ${JSON.stringify(error.response)}`);
        }
    }
}

export async function patch(url: string, data: any){
    console.info(url);
    try {
        let response = await axios(url, {
            method: 'PATCH',
            headers: createHeader(),
            data: data 
        });
        return response.data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log(`Response (SyntaxError) ${error}`)
        } else {
            console.log(`Response ${JSON.stringify(error.response)}`)
        }
        if(error.response.data.statusCode === 401) {
            if (loginCount>3) return Promise.reject(`LOGIN QUA NHIEU - KHONG GUI DUOC MESSAGE`) 
            return await requestLogin();
        } else
        return Promise.reject(`KHONG GUI DUOC MESSAGE:  ${JSON.stringify(error.response)}`);
    }
}

let loginCount = 0;
//call api de xac thuc tai khoan nguoi dung
const requestLoginL = async ():Promise<any> => {
    loginCount++;
    const credentials: LoginDto ={
        username: gVar.user.username,
        password: gVar.userPass? gVar.userPass:'',
        platform: (Platform.OS).toUpperCase(),
        devicecode: gVar.fcmToken?gVar.fcmToken:''
    }

    const dispatch: Dispatch<any> = useDispatch()

    // const response = await login(credentials);
    // //console.log(JSON.stringify(response, null, 2))
    // if(!response.accessToken) return false;
    // const account: IAccount = {
    //     accessToken: response.accessToken,
    //     user: response.user,
    //     isLogin: true
    // }
    // saveStateLogin(account)
    // dispatch(successLogin(account))
    // return true;
    
}

async function requestLogin():Promise<any> {
    
    await getStateLoginForgVar();
    const credentials: LoginDto ={
        username: gVar.user.username,
        password: gVar.userPass? gVar.userPass:'',
        platform: (Platform.OS).toUpperCase(),
        devicecode: gVar.fcmToken?gVar.fcmToken:''
    } 

    // login(credentials)
    //     .then(result => {
    //         console.log('RES: ', result);
    //         if (result.accessToken) {
    //             gVar.accessToken = result.accessToken;
    //             gVar.isLogin = true;
    //             saveStateLogin(gVar);
    //             return true
    //         } else {
    //             console.warn('Error: ',result);
    //             return false
    //         }
            
    //     })
    //     .catch(error => {
    //         console.warn('Dang nhap thất bai', error);
    //         return false;
    //     });
}

export async function del(url: string){
    console.log("DELETE: "+url)
    try {
        let response = await axios(url, {
            method: 'DELETE',
            headers:createHeader()
        });
        return response.data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log(`Response (SyntaxError) ${error}`)
        } else {
            console.log(`Response ${error}`)
        }
        return Promise.reject(`KHONG GUI DUOC MESSAGE:  ${JSON.stringify(error.response)}`);
    }
}