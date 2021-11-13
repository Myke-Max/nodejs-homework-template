const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')

const getAll = async (req, res) => {
  const { page, limit } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  const result = await Contact.find({ owner: _id }, '_id name email phone owner favorite', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email')
  successResponse(res, { result })
  // res.json({ contacts })

  // res.status(500).json({
  //   status: 'error',
  //   code: 500,
  //   message: 'server error',
  // })
  return result
  // If the error handler has 4 arguments, then express will pass it to the 1st
}
module.exports = getAll
