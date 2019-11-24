'use strict'
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
module.exports = class extends Service {
    async login(name, password) { //登陆
        let getuser = await this.app.mysql.get('userlist', { name })
        if (!getuser) {
            //该用户不存在
            return { code: 1, msg: '该用户不存在' };
        }
        let res = await this.app.mysql.query(`select * from userlist where name='${name}' and password='${password}'`);
        if (res.length > 0) {
            //登陆成功
            let a = res[0],
                b = this.app.config.keys;
            let token = jwt.sign({...a }, b, { expiresIn: '8h' })
            return { code: 0, msg: '登陆成功', token, userinfo: a };
        } else {
            //登陆失败密码错误
            return { code: 1, msg: '密码错误' };
        }
    }
    async getrole(id) { //获取角色
        let sql = `select r_id from u_role where u_id='${id}'`;
        let roleid = await this.app.mysql.query(sql);
        roleid = roleid.map(item => item.r_id);
        let res = await this.app.mysql.query(`select * from role where id in (${roleid})`);
        if (res.length == 0) {
            return { code: 1, smg: '没有身份身份' }
        } else {
            return { code: 0, role: res }
        }

    }
    async getpower(id) { //获取权限
        let powerid = await this.app.mysql.query(`select p_id from r_power where r_id in (${id})`);
        powerid = powerid.map(item => item.p_id);
        let power = await this.app.mysql.query(`select * from power where id in (${[powerid]})`);
        if (power.length == 0) {
            return { code: 1, smg: '没有权利' }
        } else {
            return { code: 0, power: power }
        }
    }
}