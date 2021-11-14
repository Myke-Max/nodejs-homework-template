const express = require('express')
const router = express.Router()
const { controllerWrapper, validation, authenticate } = require('../../midddlewares')
const { authControllers } = require('../../controllers/')
const { joiUserSchema } = require('../../model/auth')

/* 1.Get all contacts.
   2.Get contact by id
   3.Add new contact
   4.Delete contact by id
   5.Update contact by id
*/

router.post(
  '/registration',
  validation(joiUserSchema),
  controllerWrapper(authControllers.registration),
)

router.post('/login', validation(joiUserSchema), controllerWrapper(authControllers.login))

router.get('/logout', authenticate, controllerWrapper(authControllers.logout))

router.patch(
  '/:id/users',
  authenticate,
  // validation(joiSchema),
  controllerWrapper(authControllers.updateSubscription),
)

module.exports = router
