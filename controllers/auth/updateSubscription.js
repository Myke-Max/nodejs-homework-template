const { User } = require('../../model/auth')
const { successResponse } = require('../../helpers')
const updateSubscription = async (req, res) => {
  const { subscription } = req.body
  const { id } = req.params

  const result = await User.findByIdAndUpdate(id, { subscription })

  successResponse(res, { result })
}
module.exports = updateSubscription
