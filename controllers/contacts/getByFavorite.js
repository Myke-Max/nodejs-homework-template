const { Contact } = require('../../model/contact')

const getByFavorite = async (req, res) => {
  const { _id } = req.user
  //   const { favorite } = req.query

  const result = await Contact.find(
    { owner: _id, favorite: true },
    '_id name email phone owner favorite',
  )
  console.log(result)
}
module.exports = getByFavorite
