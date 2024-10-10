import express from 'express'
import cors from 'cors' // 引入 cors 中间件
import { sendWelcomeEmail } from './Email.js' // 确保使用.js扩展名

const app = express()

// 启用 CORS 以允许跨域请求
app.use(cors())

// 允许解析 JSON 请求体
app.use(express.json())

// 邮件发送路由
app.post('/send-email', (req, res) => {
  const { email } = req.body

  sendWelcomeEmail(email).then((result) => {
    if (result) {
      res.status(200).send('Email sent successfully!')
    } else {
      res.status(500).send('Failed to send email.')
    }
  })
})

// 启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
