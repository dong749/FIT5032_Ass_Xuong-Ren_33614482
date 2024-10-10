import Mailgun from 'mailgun.js'
import formData from 'form-data'
import fs from 'fs'
import path from 'path'

const DOMAIN = 'sandbox4e6dc04768454335aea86456246699f8.mailgun.org'
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: '6953f88b3fb6f4c60144e6afb3aef35f-5dcb5e36-439d6a63'
})

export const sendWelcomeEmail = (email) => {
  var templateFile = 'templateFile.pdf'
  let data
  try {
    data = fs.readFileSync(path.join(templateFile))
  } catch (error) {
    console.error('Error file message: ', error)
  }
  return mg.messages
    .create(DOMAIN, {
      from: 'Mailgun Sandbox <sendbox@sandbox4e6dc04768454335aea86456246699f8.mailgun.org>',
      to: [email],
      subject: 'Welcome',
      template: 'demo_1',
      attachment: data
    })
    .then((msg) => {
      console.log('Email send sucessful', msg)
      return true
    })
    .catch((err) => {
      console.error('Email send error', err)
      return false
    })
}
