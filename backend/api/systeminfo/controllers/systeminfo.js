'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * api: 1337/systeminfo/getResource?file=vrlab/course1.html
     * redirect to actual url.
     * redirect 
     * @return void
    */

    async getResource(ctx) {
        const res = await strapi.query('systeminfo').findOne();
        if (!res) return ctx.badRequest(null);
        const serverHost = res.resource_server.split('\n').sort(() => Math.random() - 0.5).pop();
        const finalURL = new URL(serverHost);
        finalURL.pathname = ctx.query.file;


        ctx.status = 302;
        ctx.redirect(finalURL.href);
        return
    }
};
