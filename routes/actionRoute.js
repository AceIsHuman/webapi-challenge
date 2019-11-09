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

// MIDDLEWARE
async function validateActionId(req, res, next) {
  const action = await actionsModel.get(req.id);
  action ?
    (req.action = action, next()) :
    res.status(404).json("Invalid action id.");
}

module.exports = router;