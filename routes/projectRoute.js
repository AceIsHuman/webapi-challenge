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
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectsModel.get(id);
    if (project) return res.status(200).json(project);
    else return res.status(404).json({ message: "A project with that id does not exist." });
  }
  catch (err) {
    return res.status(500).json({ errorMessage: "Unable to retrive project." });
  }
});

module.exports = router;