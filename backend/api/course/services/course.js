'use strict';
const ExcelJS = require('exceljs');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
function extractInfo(list){
    return list.map(el=>{
        let details = undefined;
        try {
            details = JSON.parse(el.detail);
        } catch (e) {
            console.error(e);
        }
        return {
            id: el.id,
            username: el.student.username,
            realname: el.student.realname,
            realid: el.student.realid,
            course: el.course.name,
            point: el.point,
            ...details
        };
    }); 
}
module.exports = {
    async export(params) {
        const workbook = new ExcelJS.Workbook();
        const author = 'strapi';
        workbook.creator = author;
        workbook.lastModifiedBy = author;
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();
        const worksheet = workbook.addWorksheet('Scores');
        
        const courseDetail = await strapi.query('course').findOne({id: params.course_eq}, ['meta']);

        worksheet.columns = [
            { header: 'id', key: 'id', width: 10 },
            { header: 'course', key: 'course', width: 30, },
            { header: 'username', key: 'username', width: 30 },
            { header: 'realname', key: 'realname', width: 30 },
            { header: 'realid', key: 'realid', width: 30 },
            { header: 'point', key: 'point', width: 10, },
        ].concat(courseDetail.meta.required.map(el=>({
            header: el, key: el, width: 10,
        })));
        const scoreList = await strapi.query('score').find(params, ['course', 'student']);
        worksheet.addRows(extractInfo(scoreList));
     
        return workbook;
    },
};
