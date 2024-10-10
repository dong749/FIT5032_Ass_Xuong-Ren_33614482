import express from 'express'
import cors from 'cors'
import { sendWelcomeEmail } from './Email.js'

const app = express()
app.use(cors())

app.use(express.json())

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`)
})
