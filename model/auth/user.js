const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    //   owner: {
    //     type: SchemaTypes.ObjectId,
    //     ref: 'user',
    //   },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  const getSalt = genSaltSync(10)
  this.password = hashSync(password, getSalt)
}

userSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.password)
}

const pattern = {
  password: '^[a-zA-Z0-9]{3,30}$',
}

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).pattern(new RegExp(pattern.password)).required(),
  email: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = { User, joiUserSchema }
