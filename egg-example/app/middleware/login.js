const whiteList = [
    '/',
    '/login'
]
const jwt = require('jsonwebtoken');
module.exports = () => {

    return async(ctx, next) => {
        if (whiteList.includes(ctx.path)) {
            //不需要权限
            await next();
        } else {
            console.log('需要权限')
            let token = ctx.request.headers.token;

            if (token) { //有token
                try {
                    let keys = ctx.app.config.keys;
                    let flag = jwt.verify(token, keys)
                    await next();
                } catch (e) {
                    ctx.body = { e, msg: '中间件' }
                }
            } else {
                ctx.body = { code: 0, msg: '缺少权限' }
            }
        }

    }
}