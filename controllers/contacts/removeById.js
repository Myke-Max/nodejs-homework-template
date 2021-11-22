const { Contact } = require('../../model/contact')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const removeById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndRemove({ owner: id })
  if (!result) {
    throw new NotFound(`Contact with id ${id} not found`)
  }

  successResponse(res, { message: 'Success delete' })
}

module.exports = removeById
