const commentModel = require('../models/comment.js')

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const stats = await commentModel.aggregate([
      {
        $group: {
          _id: null,
          toxic: {
            $sum: {
              $cond: [{ $eq: ['$toxic', 1] }, 1, 0]
            }
          },
          threat: {
            $sum: {
              $cond: [{ $eq: ['$threat', 1] }, 1, 0]
            }
          },
          severe_toxic: {
            $sum: {
              $cond: [{ $eq: ['$severe_toxic', 1] }, 1, 0]
            }
          },
          identity_hate: {
            $sum: {
              $cond: [{ $eq: ['$identity_hate', 1] }, 1, 0]
            }
          },
          obscene: {
            $sum: {
              $cond: [{ $eq: ['$obscene', 1] }, 1, 0]
            }
          },
          insult: {
            $sum: {
              $cond: [{ $eq: ['$insult', 1] }, 1, 0]
            }
          },
          totalDocs: { $sum: 1 }
        }
      }
    ])
    return res.status(200).json({
      data: stats,
      status: 1
    })
  } catch (error) {
    return res.status(500).json({
      message: error?.message,
      name: error?.name,
      status: 0
    })
  }
})

module.exports = router
