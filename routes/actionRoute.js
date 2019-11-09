const express = require('express');
const actionsModel = require('../data/helpers/actionModel');

const router = express.Router();

// GET ALL ACTIONS
router.get('/', async (req, res) => {
  try {
    const actions = await actionsModel.get();
    return res.status(200).json(actions);
  }
  catch(err) {
    return res.status(500).json({ errorMessage: "Unable to retrieve actions" });
  }
});

module.exports = router;