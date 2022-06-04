import { Spin, message } from 'antd';
import token from '@/utils/token';

export function afterLogin(jwt:string, display:string){
    token.val = jwt;
    message.success("欢迎 " + display);
    window.location.href = "/";
}