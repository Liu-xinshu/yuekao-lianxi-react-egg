/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1574422081094_9296';

    // add your middleware config here
    config.middleware = ['login'];

    // add your user config here
    const userConfig = {
        myAppName: 'egg',
        mysql: {
            client: {
                user: 'root',
                password: 'root',
                port: 3306,
                host: 'localhost',
                database: 'user'
            }
        }
    };

    return {
        ...config,
        ...userConfig,
    };
};