require('dotenv').config();

const express = require("express");
const router = express.Router();

router.use(express.json()); // Parse JSON bodies

let tasks = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
  { id: 3, task: 'Build CRUD API', completed: true },
];

// GET All – Read
router.get('/tasks', (req, res) => {
  res.status(200).json(tasks); // Send array as JSON
});

router.get('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id == parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
});

router.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body }; // Auto-ID
  tasks.push(newTask);
  res.status(201).json(newTask); // Echo back
});


// PATCH Update - Partial
router.patch('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id)); //Array.find(
    if (!task) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body); //Merge: e.g., {completed: true}
    res.status(200).json(task);
});

// DELETE Remove
router.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    const tasks = tasks.filter((t) => t.id !== id); // Array.filter() - non-destructive
    if (tasks.length === initialLength)
        return res.status(404).json({ error: 'Not found' });
    res.status(204).send(); // Silent success
  });

  router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Server error!'});
  });

// test route
router.get("/", (req, res) => {
  res.json({ message: "Tasks route working" });
});

module.exports = router;   // ✅ VERY IMPORTANT