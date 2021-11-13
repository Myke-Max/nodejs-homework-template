const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { _id } = req.user
  const result = await Contact.findById(_id)
  if (!result) {
    throw new NotFound(`Contact with id ${_id} not found`)
  }
  successResponse(res, { result })
}

module.exports = getById
