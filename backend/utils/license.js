const { machineIdSync } = require('node-machine-id');

const jws = require('jws');
const { default: axios } = require('axios');

let id = machineIdSync({original: true})
let isvalid = true;
let message = '';

exports.getLicenseState = function(){
    return {
        isvalid, id, message
    };
}

exports.licenseVerify = function(){
    console.log('verify license');
    
    const url = 'https://gitee.com/vr-lab/vrlab-license-center/raw/master/license/'+id+'.cert';
    
    return axios.get(url)
    .then(res=>{
        const p = jws.decode(res.data);
        const payload = JSON.parse(p.payload);
        console.log(p);
        if (payload.id !== id){
            throw('id is invalid');
        } 
        if (payload.expireAt < Date.now()){
            throw('license expired at ' + new Date(payload.expireAt).toDateString());
        }
        isvalid = true;
        message = 'license verified';
        console.log(message);
    })
    .catch(err=>{
        isvalid = false;
        message = err.message||err;
        console.log(message);
    })
}


if (require.main){
    exports.licenseVerify();
}