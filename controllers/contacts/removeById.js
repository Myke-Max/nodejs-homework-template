const contactsOperations = require('../../model/contacts')
const { NotFound } = require('http-errors')
const { successResponse } = require('../../helpers')

const removeById = async (req, res) => {
  
    const { id } = req.params
    const result = await contactsOperations.removedContact(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }

    successResponse(res, { message: 'Success delete' })
  
}

module.exports = removeById
