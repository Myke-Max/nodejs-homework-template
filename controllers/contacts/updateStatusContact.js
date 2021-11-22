const { Contact } = require('../../model/contact')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body
  const { id } = req.params

  const result = await Contact.findByIdAndUpdate({ owner: id }, { favorite }, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id ${id} not found`)
  }
  successResponse(res, { result })
}

module.exports = updateStatusContact
