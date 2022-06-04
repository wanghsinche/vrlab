const {default: axios} = require('axios');
const request = require('request');
const purest = require('purest')({ request });
//CAS Server的登陆URL
var loginServer = "https://sso.gdip.edu.cn/authserver/login";
//CAS Server的验证URL
var validateServer = "https://sso.gdip.edu.cn/authserver/serviceValidate";

//当前集成系统所在的服务器和端口号，服务器可以是机器名、域名或ip，建议使用域名。端口不指定的话默认是80
//以及应用名称和新增加的集成登录入口
// var loginasp = "https://zhxygateway.gzzhyc.cn/userApi/cas/login";
var loginasp = "http://zhxygateway.gzzhyc.cn:8080/api/cb";

var url = new URL(loginServer)
url.searchParams.set('service', loginasp)
console.log(url.toString())

// https://my.gdip.edu.cn/casLogin?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MDAxIiwiY3JlYXRlZCI6MTY1NDI3NDU5MTAxNSwiZXhwIjoxNjU0NjM0NTkxfQ.lkoDrQdD7hY2ZwgZMD5G1MnwKKztKw_ZdEeSMDMglNddYe0PPQBIpwV9S33vAduUAh_7tLb3oCWrgLwz6E7TXg&redirect=

// https://zhxygateway.gzzhyc.cn/userApi/cas/login?ticket=ST-730518-8zNeBI4ZQItJ3AmYKOPXgwfE2UAzhxy-cas-prod
var ticket = 'ST-731020-7QUsw8jflLyE9AYgLgfF9sXYXmkzhxy-cas-prod';

var verifyURL = new URL(validateServer)
verifyURL.searchParams.set('ticket', ticket)
verifyURL.searchParams.set('service', loginasp)
console.log(verifyURL.toString())

// axios.get(verifyURL.toString()).then(res=>console.log(res.data))

// https://my.gdip.edu.cn/homePage/homePage-PersonCenter

/* <cas:userName>单点登录测试账号</cas:userName> */
/* <cas:uid>1363790325084839938</cas:uid> */

const config = {
    "gdipCAS": {
        "https://sso.gdip.edu.cn": {
            "__domain": {
                "auth": {
                  "qs": {"ticket": "[0]", "service": "[1]"}
                }
              },
              "{endpoint}": {
                "__path": {
                  "alias": "__default"
                }
              }
        },
      },    
}

const gdipCAS = purest({
    provider: 'gdipCAS',
    config,
});
function matchText(text, reg, idx){
    return reg.test(text) && text.match(reg)[idx];
}
gdipCAS.query()
.get('authserver/serviceValidate')
.auth(ticket, loginasp)
.request((err, res, body)=>{
    const regUser = /<cas:user>(\S+)<\/cas:user>/;
    const regUsername = /<cas:userName>(\S+)<\/cas:userName>/;
    const regUID = /<cas:uid>(\S+)<\/cas:uid>/;
    const user = matchText(body, regUser, 1);
    const username = matchText(body, regUsername, 1);
    const UID = matchText(body, regUID, 1);
    console.log(user, username, UID)
})

//   request()
//   .get('authserver/serviceValidate')
//   .qs({ticket:access_token, service:loginasp})
//   .request((err, res, body) => {
//     if (err) {
//         console.error(err);
//     } else {
//       console.log(body);
//     //   callback(null, {
//     //     username: body.name,
//     //     email: `${body.name}@strapi.io`, // dummy email as Reddit does not provide user email
//     //   });
//     }
//   });
