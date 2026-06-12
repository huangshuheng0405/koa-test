import mongoose from 'mongoose'

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('连接成功')
  } catch (error) {
    console.log('连接失败', error)
    process.exit(1) // 退出程序
  }
}

export default connectDB
