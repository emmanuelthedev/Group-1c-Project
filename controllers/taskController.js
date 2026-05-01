let tasks = [];

exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1)
    return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
};