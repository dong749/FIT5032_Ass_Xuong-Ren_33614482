/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()
const db = admin.firestore()

exports.caculateRating = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const ratingCollection = admin.firestore().collection('rating')
      const snapshot = await ratingCollection.get()
      const count = snapshot.size
      let totalScore = 0
      snapshot.forEach((doc) => {
        const ratingData = doc.data()
        totalScore += ratingData.score
      })
      const sum = totalScore
      res.status(200).json({
        count: count,
        sum: sum
      })
    } catch (error) {
      console.error('Error calculate rating count and score sum', error.message)
      res.status(500).send('Error calculate rating count and score sum')
    }
  })
})

exports.submitRating = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { score, reason, patient, volunteer } = req.body
      const ratingCollection = admin.firestore().collection('rating')
      await ratingCollection.add({
        patient: patient,
        volunteer: volunteer,
        score: score,
        reason: reason
      })
      res.status(200).send('Rating add succefully')
    } catch (error) {
      console.error('Rating can not add and caiculate')
      res.status(500).send('Rating can not add and caiculate')
    }
  })
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
