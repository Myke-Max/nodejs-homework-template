const contactsOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const updateById = async (req, res, next) => {
  try {
    const { body } = req
    const { id } = req.params

    const result = await contactsOperations.updateContactById(id, body)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    successResponse(res, { result })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
