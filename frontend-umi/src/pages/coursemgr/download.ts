import { serverURL } from "@/utils/graphql"
import token from '@/utils/token';
import { message } from 'antd';
export const downloadFile = (id:string)=>{
    message.loading('start downloading...');
    fetch(serverURL + '/courses/export/' + id, {
        headers: {
            Authorization: `Bearer ${token.val}`
        }
    })
    .then(response => response.status === 200 ? response.blob(): Promise.reject(response.statusText) )
    .then(blob => {
        message.destroy();
        return URL.createObjectURL(blob);
    })
    .then(url => window.open(url))
    .catch(err => message.error(err));

}