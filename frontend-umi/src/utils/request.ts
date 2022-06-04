import { serverURL } from "@/utils/graphql"
import token from '@/utils/token';
import { message } from 'antd';
import axios from 'axios';
export function jsonRequest(path: string, method: 'GET' | 'POST' = 'GET', data?: unknown) {
    const headers: Record<string, string> = {
        Authorization: token.val && `Bearer ${token.val}`,
    };
    Object.keys(headers).forEach((k:string) => {
        if (!headers[k]) {
            delete headers[k]
        }
    });
    return axios(serverURL + path, {
        method,
        headers,
        data
    })
        .then(response => response.status === 200 ? response.data : Promise.reject(response.statusText))
        .catch(err => {
            message.error(String(err));
            return Promise.reject(err);
        })
}