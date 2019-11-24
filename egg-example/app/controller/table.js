'use strict';

const Constroller = require('egg').Controller;

module.exports = class extends Constroller {
    async add() {
        let { ctx } = this;
        let res = await ctx.service.table.add(ctx.query);
        console.log(res)
        ctx.body = res;
    }
    async delete() {
        let { ctx } = this;
        let res = await ctx.service.table.delete(ctx.query);
        ctx.body = res;
    }
    async edit() {
        let { ctx } = this;
        let res = await ctx.service.table.edit(ctx.query);
        ctx.body = res;
    }
    async list() {
        let { ctx } = this;
        let res = await ctx.service.table.list(ctx.query);
        ctx.body = res;
    }
}