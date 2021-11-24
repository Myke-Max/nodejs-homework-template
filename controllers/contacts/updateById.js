const { Contact } = require('../../model/contact')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const updateById = async (req, res) => {
  const { body } = req
  const { id } = req.params

  const result = await Contact.findByIdAndUpdate({ owner: id }, body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  successResponse(res, { result })
}

module.exports = updateById
