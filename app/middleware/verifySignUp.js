const db = require('../models')
const User = db.user

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (user) {
      return res.status(400).send({
        message: 'Failed! Username is already in use!'
      })
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user) {
      return res.status(400).send({
        message: 'Failed! Email is already in use!'
      })
    }

    next()
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail
}

module.exports = verifySignUp
