const contactsOperations = require('../../model/contacts')
const { successResponse } = require('../../helpers')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
 
    const { id } = req.params
    const result = await contactsOperations.getContactById(id)
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`)
    }
    successResponse(res, { result })
  
}

module.exports = getById
