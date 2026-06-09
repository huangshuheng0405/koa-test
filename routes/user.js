import KoaRouter from '@koa/router'
import User from '../models/User.js'

// 定义路由前缀
const router = new KoaRouter({ prefix: '/user' })

// 增
router.post('/register', async (ctx) => {
  try {
    const { username, password, age } = ctx.request.body

    // 创建新实例 并保存
    const user = new User({ username, password, age })
    const result = await user.save()

    ctx.body = { code: 200, message: '注册成功', data: result }
  } catch (error) {
    ctx.body = { code: 500, message: '注册失败', data: error.message }
  }
})

// 查
router.get('/', async (ctx) => {
  try {
    const users = await User.find({}, { password: 0 }) // 查询结果 隐藏密码
    ctx.body = { code: 200, message: '查询成功', data: users }
  } catch (error) {
    ctx.body = { code: 500, message: '查询失败', data: error.message }
  }
})

// 改
router.put('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const { age } = ctx.request.body

    // 更新数据 new: true 表示返回更新后的数据
    const result = await User.findByIdAndUpdate(id, { age }, { new: true })

    ctx.body = { code: 200, message: '更新成功', data: result }
  } catch (error) {
    ctx.body = { code: 500, message: '更新失败', data: error.message }
  }
})

// 删
router.delete('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const result = await User.findByIdAndDelete(id)
    ctx.body = { code: 200, message: '删除成功', data: result }
  } catch (error) {
    ctx.body = { code: 500, message: '删除失败', data: error.message }
  }
})

export default router
