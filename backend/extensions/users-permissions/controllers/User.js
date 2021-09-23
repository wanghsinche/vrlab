'use strict';
const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

const formatError = error => [
    { messages: [{ id: error.id, message: error.message, field: error.field }] },
];
  
module.exports = {
    async import(ctx){
        const advanced = await strapi
        .store({
          environment: '',
          type: 'plugin',
          name: 'users-permissions',
          key: 'advanced',
        })
        .get();
  
        const body = ctx.request.body;

        if (!body.every(el=>{
            const {username, email, realid, realname} = el;
            return username && email && realid && realname;
        })){
            return ctx.badRequest('missing.feilds: username, email, realid, realname');        
        }

        const usernames = body.map(el=>el.username);
        const userWithSameUsername = await strapi
        .query('user', 'users-permissions')
        .find({ username_in: usernames }, []);

        // check username
        if (userWithSameUsername.length > 0) {
            return ctx.badRequest(
            null,
            formatError({
                id: 'Auth.form.error.username.taken',
                message: `Username already taken: ${userWithSameUsername.map(el=>el.username)}`,
                field: ['username'],
            })
            );
        }

        // check emails
        const emails = body.map(el=>el.email);
        const userWithSameEmail = await strapi
        .query('user', 'users-permissions')
        .find({ email_in: emails }, []);

        if (userWithSameEmail.length > 0) {
            return ctx.badRequest(
            null,
            formatError({
                id: 'Auth.form.error.email.taken',
                message: `Email already taken: ${userWithSameEmail.map(el=>el.email)}`,
                field: ['email'],
            })
            );
        }


        const defaultRole = await strapi
        .query('role', 'users-permissions')
        .findOne({ type: advanced.default_role }, []);

        const role = defaultRole.id;

        try {
            const tasks = body.map(el=>{
                const {username, email, realid, realname} = el;
                const user = {
                    username, email, realid, realname,
                    confirmed: true,
                    class: "3", // class "3" is the default unassigned class
                    password: username,
                    role
                };
                return  strapi.plugins['users-permissions'].services.user.add(user);
            });
            const data = await Promise.all(tasks);
      
            ctx.created(data.map(el=>sanitizeUser(el)));
          } catch (error) {
            ctx.badRequest(null, formatError(error));
          }
      
    } 
}  