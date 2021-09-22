'use strict';

const _ = require('lodash');
function checkBadRequest(contextBody) {
  if (_.get(contextBody, 'statusCode', 200) !== 200) {
    const message = _.get(contextBody, 'error', 'Bad Request');
    const exception = new Error(message);
    exception.code = _.get(contextBody, 'statusCode', 400);
    exception.data = contextBody;
    throw exception;
  }
}

module.exports = {
    definition: /* GraphQL */ `
    input importUsersInput {
        data: [ImportUsers]
    }
    input ImportUsers {
        username: String!
        email: String!
        realname: String!
        realid: String!
      }
    type importUsersPayload {
        users: [UsersPermissionsUser]
    }
    `,
    mutation: `
      importUsers(input: importUsersInput!): importUsersPayload
    `,
    resolver: {
      Mutation: {
        importUsers: {
            description: 'Batch import users',
            resolverOf: 'plugins::users-permissions.user.import',
            resolver: async (obj, options, { context }) => {
              context.request.body = options.input.data.map(el=>_.toPlainObject(el));
    
              await strapi.plugins['users-permissions'].controllers.user.import(context);
              let output = context.body.toJSON ? context.body.toJSON() : context.body;

              checkBadRequest(output);

              return {
                users: output,
              };
            },
          },
        },
    },
  };
  