import Koa from 'koa'
import userRouter from './routes/user.js'
import connectDB from './config/db.js'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

// 1. 连接数据库
connectDB()

// 2. 中间件
app.use(bodyParser()) // 用于解析前端传来的 post 参数

// 3. 注册路由
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 4. 启动服务
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
