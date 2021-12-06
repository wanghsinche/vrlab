'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */
const { licenseVerify, getLicenseState } = require('../../utils/license');
module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  '*/1 * * * *': () => {
    const st = getLicenseState();
    if (!st.isvalid){
      licenseVerify();
    }
  },
  '* * 1 * *':() => {
    licenseVerify();
  }
};
