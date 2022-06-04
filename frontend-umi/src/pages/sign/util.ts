import { Spin, message } from 'antd';
import token from '@/utils/token';

export function afterLogin(jwt:string, display:string){
    if(!jwt) return;
    token.val = jwt;
    message.success("欢迎 " + display);
    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
}