const jws = require('jws');
const moment = require('moment');

const id = 'laptop-kvi6fqng';

var payload = {
    expireAt: moment().add('3','days').valueOf(),
    id
};

const signature = jws.sign({
    header: { alg: 'HS256' },
    payload: payload,
    secret: 'has a van',
});

console.log(signature, id);

