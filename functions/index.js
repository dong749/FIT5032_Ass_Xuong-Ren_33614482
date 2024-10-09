/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true }) // 引入 cors 并允许所有来源
admin.initializeApp()
const db = admin.firestore()

exports.submitRating = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    const { patient, volunteer, score, reason } = req.body

    if (score < 1 || score > 10 || !reason || reason.length === 0) {
      return res.status(400).json({ error: 'Invalid input' })
    }

    try {
      await db.collection('rating').add({
        patient: patient || false,
        volunteer: volunteer || false,
        score: score,
        reason: reason
      })
      return res.status(200).json({ message: 'Rating submitted successfully' })
    } catch (error) {
      console.error('Error adding document: ', error)
      return res.status(500).json({ error: 'Failed to add rating' })
    }
  })
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
