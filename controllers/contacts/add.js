const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')

const add = async (req, res) => {
  const { body, user } = req

  const newContact = { ...body, owner: user._id }
  if (!req.body.favorite) {
    req.body.favorite = false
  }

  const result = await Contact.create(newContact)

  successResponse(res, { result }, 201)
}

module.exports = add
