const User = require('../../../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  res
    .status(StatusCodes.CREATED)
    .json({
      status: "success",
      user: user.toAuthJson(),
    })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, "Please enter")
  }

  // Find user by email 
  const user = await User.findOne({ email })

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: "Please enter valid email and password!"
      })
  }

  // Compare Password
  const isPasswordCorrect = await user.comparePassword(password)
  
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: "Please enter valid email and password!"
      })
  }

  res
    .status(StatusCodes.OK)
    .json({
      status: "success",
      user: user.toAuthJson()
    })
}

module.exports = {
  register,
  login,
}