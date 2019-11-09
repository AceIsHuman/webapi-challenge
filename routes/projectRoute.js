const express = require('express');
const projectsModel = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await projectsModel.get();
    if (projects.length > 0) return res.status(200).json(projects);
    else return res.status(404).json({ message: "There is currently no projects."});
  } catch (err) {
    return res.status(500).json({ errorMessage: "Unable to retrieve projects", error: err });
  }
});

module.exports = router;