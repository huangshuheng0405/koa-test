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

// 查 通过username
router.get('/getUserInfo', async (ctx) => {
  try {
    const { username, age } = ctx.query
    const query = {}

    if (username) {
      query.username = username
    }

    if (age !== undefined) {
      const ageNumber = Number(age)
      if (Number.isNaN(ageNumber)) {
        ctx.status = 400
        ctx.body = { code: 400, message: 'age 必须是数字' }
        return
      }
      query.age = ageNumber
    }

    const users = await User.find(query)
    ctx.body = { code: 200, message: '查询成功', data: users }
  } catch (error) {
    ctx.body = { code: 500, message: '查询失败', data: error.message }
  }
})

// 改
router.put('/:username', async (ctx) => {
  try {
    const { username } = ctx.params
    const { age, password } = ctx.request.body

    const update = {}

    if (age !== undefined) {
      const ageNumber = Number(age)
      if (Number.isNaN(ageNumber)) {
        ctx.status = 400
        ctx.body = { code: 400, message: 'age 必须是数字' }
        return
      }
      update.age = ageNumber
    }

    if (password !== undefined) {
      update.password = password
    }

    if (Object.keys(update).length === 0) {
      ctx.status = 400
      ctx.body = { code: 400, message: '至少需要传入 age 或 password' }
      return
    }

    const result = await User.findOneAndUpdate(
      { username },
      { $set: update },
      { new: true }
    )

    if (!result) {
      ctx.status = 404
      ctx.body = { code: 404, message: '用户不存在' }
      return
    }

    ctx.body = { code: 200, message: '更新成功', data: result }
  } catch (error) {
    ctx.body = { code: 500, message: '更新失败', data: error.message }
  }
})

// 删 通过 username 删除
router.delete('/:username', async (ctx) => {
  try {
    const { username } = ctx.params
    const result = await User.findOneAndDelete({ username })
    ctx.body = { code: 200, message: '删除成功', data: result }
  } catch (error) {
    ctx.body = { code: 500, message: '删除失败', data: error.message }
  }
})

export default router
