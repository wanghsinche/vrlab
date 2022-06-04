
module.exports = ({env}) => {
    if(env('NODE_ENV') === 'production'){
        return {
            settings:{
                cors:{
                    enabled: false
                }
            }
        }
    }
    return ({
    settings:{
        cors: {
            enabled: true,
            // headers: '*', 
            origin: [ 
                'http://zhxygateway.gzzhyc.cn:1337',
                'http://zhxygateway.gzzhyc.cn:8000',
                'http://localhost:8000',
                'http://localhost:1337',
            ],
        },    
    }
    //
})};
