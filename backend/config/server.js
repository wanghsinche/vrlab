module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: 1337, //env.int('PORT', 1337),
  url: env('URL', 'http://zhxygateway.gzzhyc.cn:1337/'),
  cron :{
    enabled: true,
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd06b51d98451d217c9a37cebe2edb309'),
    },
  },
});
