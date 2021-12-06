const { getLicenseState } = require('../../utils/license');

const formatError = error => [
    { messages: [{ id: error.id, message: error.message, field: error.field }] },
];
module.exports = strapi => {
    return {
      initialize() {
        strapi.app.use(async (ctx, next) => {
            const st = getLicenseState();
            if (!st.isvalid) {
                const msg = `[license]:[${st.id}]:`+st.message;
                return ctx.badRequest(msg);
            }
            await next();
        });
      },
    };
  };
  

