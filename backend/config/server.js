console.log('[strapi env]', process.env);
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', ''),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd06b51d98451d217c9a37cebe2edb309'),
    },
  },
});
