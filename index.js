import Koa from 'koa'
import userRouter from './routes/user.js'
import connectDB from './config/db.js'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'

const app = new Koa()

// 1. 连接数据库
connectDB()

// 2. 中间件
app.use(bodyParser()) // 用于解析前端传来的 post 参数
app.use(cors()) // 用于处理跨域问题

// 3. 注册路由
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 4. 启动服务
app.listen(3000, 'localhost', () => {
  console.log('http://localhost:3000')
})

export default app
