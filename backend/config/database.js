module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', 'data/database.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
