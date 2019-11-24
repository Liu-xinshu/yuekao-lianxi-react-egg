'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    async login() { //登陆
        const { ctx } = this;
        let { name, password } = ctx.request.body;
        let res = await ctx.service.user.login(name, password);
        ctx.body = res;
    }
    async getrole() {
        const { ctx } = this;
        let { id } = ctx.query;
        let res = await ctx.service.user.getrole(id);
        ctx.body = res;


    }
    async getpower() {
        const { ctx } = this;
        let { id } = ctx.query;

        let res = await ctx.service.user.getpower(JSON.parse(id));
        ctx.body = res;
    }
}

module.exports = HomeController