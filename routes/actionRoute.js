const express = require('express');
const actionsModel = require('../data/helpers/actionModel');
const projectsModel = require('../data/helpers/projectModel');

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

// GET ACTION BY ID
router.get('/:id', validateActionId, (req, res) => {
  return res.status(200).json(req.action);
});

// ADD AN ACTION
router.post('/', validateAction, validateProjectId, async (req, res) => {
  try {
    const action = await actionsModel.insert(req.body);
    return res.status(200).json(action);
  } catch(err) {
    return res.status(500).json({ errorMessage: "Unable to create action." });
  }
});

// MIDDLEWARE
async function validateActionId(req, res, next) {
  const action = await actionsModel.get(req.params.id);
  action ?
    (req.action = action, next()) :
    res.status(404).json("Invalid action id.");
}

async function validateProjectId(req, res, next) {
  const id = req.body.project_id;
  try {
    const project = await projectsModel.get(id);
    project
      ? (req.project = project)
      : res.status(400).json({ message: "Invalid project id" });
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
  next();
}

function validateAction(req, res, next) {
  const {project_id, description, notes} = req.body;
  if (!project_id || !description || !notes) return res.status(400).json({ message: "Provide project_id, description, and notes fields." });
  if (description.length > 128) return res.status(400).json({ message: "Description must not be longer than 128 characters" });
  next();
}

module.exports = router;