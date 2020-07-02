const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const partner = require('../../controllers/partner');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

// const joiOptions = {
//   allowUnknown: true,
// };

// const validateMiddleware = (req, res, next) => {
//   const schema = joiSchema;

//   celebrate(schema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  // authMiddleware,
  // validateMiddleware,
  partner.handle,
);

router.get(
  '/coordinates',
  // authMiddleware,
  // validateMiddleware,
  partner.handle,
);

module.exports = router;
