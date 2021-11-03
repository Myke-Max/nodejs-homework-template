const contactsOperations = require('../../model/contacts')
const { successResponse } = require('../../helpers')

const getAll = async (req, res,) => {
 
    const result = await contactsOperations.getAllContacts()
    successResponse(res, { result })
    // res.json({ contacts })
  
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'server error',
    // })

    // If the error handler has 4 arguments, then express will pass it to the 1st
}
module.exports = getAll
