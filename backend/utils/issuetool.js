const jws = require('jws');
const moment = require('moment');

const id =  process.argv[2];
// 'laptop-kvi6fqng';

var payload = {
    expireAt: moment().add('60','days').valueOf(),
    id
};

const signature = jws.sign({
    header: { alg: 'HS256' },
    payload: payload,
    secret: 'has a van',
});


console.log(signature, id);

