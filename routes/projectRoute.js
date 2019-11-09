const express = require('express');
const projectsModel = require('../data/helpers/projectModel');

const router = express.Router();

// GET ALL PROJECTS
router.get('/', async (req, res) => {
  try {
    const projects = await projectsModel.get();
    if (projects.length > 0) return res.status(200).json(projects);
    else return res.status(404).json({ message: "There is currently no projects."});
  } catch (err) {
    return res.status(500).json({ errorMessage: "Unable to retrieve projects", error: err });
  }
});

// GET PROJECT BY ID
router.get('/:id', validateProjectId, async (req, res) => {
  return res.status(200).json(req.project);
});

// CREATE A NEW PROJECT
router.post('/', validateProject, async (req, res) => {
  try {
    const project = await projectsModel.insert(req.body);
    return res.status(201).json(project);
  }
  catch (err) {
    return res.status(500).json({ errorMessage: "An error occurred while creating a new project." });
  }
})

//  MIDDLEWARE
async function validateProjectId(req, res, next) {
  const id = req.params.id;
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

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name && !description) return res.status(400).json({ message: "Provide project information."});
  if (!name) return res.status(400).json({ message: "Missing required name."});
  if (!description) return res.status(400).json({ message: "Missing required description."});
  next();
}

module.exports = router;