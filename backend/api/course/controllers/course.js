'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 const { PassThrough } = require('stream');

 module.exports = {
   /**
    * Retrieve the record.
    *
    * @return {Object}
    */
 
   async export(ctx) {
    const { id } = ctx.params;

    const workbook  = await strapi.services.course.export({ course_eq: id }, strapi.models.score);
    const myStream = new PassThrough();

    ctx.attachment('score.xlsx');
    ctx.body = myStream;
    workbook.xlsx.write(myStream);

    return;
   },
 };
  
