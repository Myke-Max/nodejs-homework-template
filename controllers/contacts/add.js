const { Contact } = require('../../model/contact')
const { successResponse } = require('../../helpers')

const add = async (req, res) => {
  const { body } = req
  if (!req.body.favorite) {
    req.body.favorite = false
  }
  const result = await Contact.create(body)

  successResponse(res, { result }, 201)
}

module.exports = add
