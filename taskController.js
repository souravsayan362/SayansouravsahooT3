let tasks = [];
let currentId = 1;

const findTaskIndex = id =>
  tasks.findIndex(task => task.id === id);

export const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

export const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
};

export const createTask = (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Task text is required' });
  }

  const newTask = {
    id: currentId++,
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = findTaskIndex(id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { text, completed } = req.body;

  tasks[index] = {
    ...tasks[index],
    text: text || tasks[index].text,
    completed:
      completed !== undefined ? completed : tasks[index].completed
  };

  res.status(200).json(tasks[index]);
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const lengthBefore = tasks.length;

  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === lengthBefore) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).end();
};
