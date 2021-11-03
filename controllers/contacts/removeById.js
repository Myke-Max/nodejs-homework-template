const contactsOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removedContact(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }

    successResponse(res, { message: 'Success delete' })
  } catch (error) {
    next(error)
  }
}

module.exports = removeById
