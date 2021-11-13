const express = require('express')
const router = express.Router()
const { authenticate, validation, controllerWrapper } = require('../../../midddlewares')
const { contactsControllers: ctrl } = require('../../../controllers')
const { joiSchema } = require('../../../model/contact')

/* 1.Get all contacts.
   2.Get contact by id
   3.Add new contact
   4.Delete contact by id
   5.Update contact by id
*/

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:id', authenticate, controllerWrapper(ctrl.getById))

router.get('/favorite', authenticate, controllerWrapper(ctrl.getByFavorite))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

router.put('/:id', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch(
  '/:id/favorite',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

router.delete('/:id', authenticate, controllerWrapper(ctrl.removeById))

module.exports = router
