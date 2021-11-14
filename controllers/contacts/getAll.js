const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')

const getAll = async (req, res) => {
  const { page, limit, favorite } = req.query
  const skip = (page - 1) * limit
  const { _id } = req.user
  console.log(req.query)
  if (favorite) {
    const result = await Contact.find({ favorite }, '_id name email phone owner favorite', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email')
    successResponse(res, { result })
    return result
  }

  const result = await Contact.find({ owner: _id }, '_id name email phone owner favorite', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email')
  successResponse(res, { result })

  return result
  // If the error handler has 4 arguments, then express will pass it to the 1st
}
module.exports = getAll
