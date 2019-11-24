'use strict'
const Service = require('egg').Service;

module.exports = class extends Service {
    async add({...arg }) {

        let { type, time, title, writer, rank, State } = arg;

        if (type === undefined || time === undefined || title === undefined || writer === undefined || rank === undefined || State === undefined) {
            return { msg: '缺少参数' }
        } else {
            let getTitle = await this.app.mysql.get('tab', { title });

            if (!getTitle) { //没有获取到可以添加

                let sql = `insert into tab (type,time,title,writer,rank,State) values (${type},'${time}','${title}','${writer}','${rank}','${State}')`;

                let res = await this.app.mysql.query(sql)
                if (res.affectedRows == 1) { //添加成功

                    return { code: 0, msg: '添加成功' }
                } else {

                    return { code: 1, msg: '添加失败' }
                }
            } else { //获取到了不能重复添加
                return { code: 1, msg: '标题重复' }
            }
        }



    }
    async delete({ id }) {
        let getdata = await this.app.mysql.get('tab', { id });
        if (!getdata) {
            return { code: 1, msg: '该数据不存在' }
        }

        let res = await this.app.mysql.query(`delete from tab where id='${id}'`);
        if (res.affectedRows == 1) { //删除成功
            return { code: 0, msg: '删除成功' }
        } else {
            return { code: 1, msg: '删除失败' }
        }
    }
    async edit({ id, type, time, title, writer, rank, amount, State }) {
        console.log(id, type, time, title, writer, rank, amount, State)
        if (type === undefined || time === undefined || title === undefined || writer === undefined || rank === undefined || amount === undefined || State === undefined || id == undefined) {
            return { msg: '缺少参数' }
        }
        let sql = `update tab set type='${type}',time='${time}',title='${title}',writer='${writer}',rank='${rank}',amount='${amount}',State='${State}' where id='${id}'`;
        let res = await this.app.mysql.query(sql);
        if (res.affectedRows == 1) { //修改成功
            return { code: 0, msg: '修改成功' }
        } else {
            return { code: 1, msg: '修改失败' }
        }
    }
    async list({ page = 1, pageSize = 5 }) {
        if (page === undefined || pageSize === undefined) return { code: 1, msg: '缺少参数' };
        let total = await this.app.mysql.query(`select * from tab`);
        let startIndex = (page - 1) * pageSize;
        let res = await this.app.mysql.query(`select * from tab limit ${startIndex},${pageSize}`);
        return { data: res, total: total.length }
    }

}