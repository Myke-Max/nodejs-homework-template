const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  successResponse(res, { result })
}

module.exports = getById
