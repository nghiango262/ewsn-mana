import axios from 'axios';
import { removeObjectForKey, getObjectForKey, setObjectForKey} from '../utils/deviceStorage';
import { User } from './interface';
import { login } from './api';
import {gVar, getStateLoginForgVar, saveStateLogin} from '../utils/globalVar';

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
            return await requestLogin();
        } else
        return Promise.reject(error.response);
    }
}

export async function get(url: string){
    console.info(url);
    try {
        let response = await axios(url, {
            method: 'GET',
            headers: createHeader()
        });
        return response.data;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log(`Response (SyntaxError) ${error}`)
        } else {
            console.log(`Response ${JSON.stringify(error.response)}`)
        }
        if(error.response.data.statusCode === 401) {
            return await requestLogin();
        } else
        return Promise.reject(`KHONG GUI DUOC MESSAGE:  ${JSON.stringify(error.response)}`);
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
            return await requestLogin();
        } else
        return Promise.reject(`KHONG GUI DUOC MESSAGE:  ${JSON.stringify(error.response)}`);
    }
}

async function requestLogin():Promise<any> {
    
    await getStateLoginForgVar();
    console.log('RES: ', gVar.fcmToken); 
    // login(gVar.username, gVar.password, gVar.fcmToken)
    //     .then(result => {
    //         console.log('RES: ', result);
    //         if (result.accessToken) {
    //             gVar.accessToken = result.accessToken;
    //             gVar.isActive = true;
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