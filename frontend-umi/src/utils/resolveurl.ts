import { serverURL } from './graphql';
export function resolveUploadsURL(text: string){
    return text.replace(/\(\/uploads\//g, `(${serverURL}/uploads/`);
}