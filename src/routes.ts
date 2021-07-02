import { Router } from 'express';
import UsersController from '@controller/Users.controller'
import ProductsController from '@controller/Products.controller'
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import { celebrate, Segments, Joi } from 'celebrate';

const router = Router();
const usersController = new UsersController();
const productsController = new ProductsController();

router.post('/users',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  usersController.session
);

router.use(ensureAuthenticated);

router.get('/products/:organizationName',
  celebrate({
    [Segments.PARAMS]: {
      organizationName: Joi.string().required()
      
    },
    [Segments.QUERY]: {
      tags: Joi.array().items(Joi.string().required())
    },
  }),
  productsController.index
)

export { router };