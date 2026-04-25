const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const ctrl = require('../controllers/todoController');

router.use(protect);
router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.patch('/:id/done', ctrl.toggleDone);
router.delete('/:id', ctrl.remove);

module.exports = router;