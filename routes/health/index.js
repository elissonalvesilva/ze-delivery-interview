const { Router } = require('express');

const router = new Router({ mergeParams: true });

router.get('/', async (req, res) => res.json({
  status: 'ok',
}));

module.exports = router;
