'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/login', controller.home.login);
    router.get('/getrole', controller.home.getrole);
    router.get('/getpower', controller.home.getpower);
    router.get('/add', controller.table.add);
    router.get('/delete', controller.table.delete);
    router.get('/edit', controller.table.edit);
    router.get('/list', controller.table.list);
};