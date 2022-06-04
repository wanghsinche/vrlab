
module.exports = () => ({
    settings:{
        cors: {
            enabled: false,
            // headers: '*', 
            origin: ["http://localhost:8000", 'http://zhxygateway.gzzhyc.cn:8000'],
        },    
    }
    //
});
