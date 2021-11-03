const contactsOperations = require('../../model/contacts')
const { successResponse } = require('../../helpers')

const add = async (req, res,) => {
  
    const { body } = req

    const result = await contactsOperations.addContact(body)

    successResponse(res, { result }, 201)
}

module.exports = add
