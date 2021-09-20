'use strict';

const handleErrors = (ctx, err = undefined, type) => {
    throw strapi.errors[type](err);
};
  

module.exports = async (ctx, next) => {
    if (!ctx.state.user) {
        return handleErrors(ctx, undefined, 'forbidden');
    }

    console.debug("[users-permissions-plugin]", 
        ctx.request.body, ctx.params, 
        ctx.state.user.role.name
    );
    const allowField = ['email', 'password', 'realname','realid','class'];
    const allowSet = new Set(allowField);
    if (!Object.keys(ctx.request.body).every(el=>allowSet.has(el))){
        return handleErrors(ctx, `only allow to modify ${allowField}, but got ${Object.keys(ctx.request.body)}`, 'forbidden');
    }

    const id = ctx.params.id;

    if (String(ctx.state.user.id) === String(id)) {
        return next();
    }

    // if (ctx.state.user.role.name === 'Administrator') {
    //     // Go to next policy or will reach the controller's action.
    //     return await next();
    // }
    
    // if (ctx.state.user.role.name === 'Teacher') {
    //     // Go to next policy or will reach the controller's action.
    //     return await next();
    // }

    return handleErrors(ctx, 'forbid to update others', 'forbidden');
};
