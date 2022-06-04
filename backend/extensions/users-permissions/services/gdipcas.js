const request = require('request');
const purest = require('purest')({ request });

module.exports = function(ticket, service, cb){
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
    return gdipCAS.query()
    .get('authserver/serviceValidate')
    .auth(ticket, service)
    .request((err, res, body)=>{
        if (err) {
            cb(err)
            return;
        }
        const regUser = /<cas:user>(\S+)<\/cas:user>/;
        const regName = /<cas:userName>(\S+)<\/cas:userName>/;
        const regUID = /<cas:uid>(\S+)<\/cas:uid>/;
        const username = matchText(body, regUser, 1);
        const name = matchText(body, regName, 1);
        const UID = matchText(body, regUID, 1);
        if (!username) {
          console.log(res.body, res.request.url);
          cb({ message: 'gdip CAS authenticate failed.' + res.body });
          return;
        }
        console.log({username, name, email: `${username}@gdip.edu.cn`, UID });
        cb(null, {username, name, email: `${username}@gdip.edu.cn`, UID }) 
    })
}