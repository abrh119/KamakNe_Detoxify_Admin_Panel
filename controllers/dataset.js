const commentModel = require('../models/comment.js')

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const pageNo = Number(req.query.pageNo)
    const pageSize = Number(req.query.pageSize)
    commentModel.paginate({}, { offset: (pageNo - 1) * pageSize, limit: pageSize, page: pageNo }, (error, result) => {
      if (error) {
        return res.status(500).json({
          message: error?.message,
          name: error?.name,
          status: 0
        })
      }
      return res.status(200).json({
        status: 1,
        data: result
      })
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
