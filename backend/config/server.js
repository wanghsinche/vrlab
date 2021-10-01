module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env.int('URL', 'https://vrlab.heroku.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd06b51d98451d217c9a37cebe2edb309'),
    },
  },
});
