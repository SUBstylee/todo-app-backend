const express = require('express');
const router = express.Router();

// Temporary in-memory data
let tasks = [];

// GET /tasks
router.get('/tasks', (req, res) => {
	res.status(200).json(tasks);
});

// POST /tasks
router.post('/tasks', (req, res) => {
	const { title, color, completedStatus } = req.body;
	const newTask = {
		id: tasks.length + 1,
		title,
		color: color || '#fff',
		completedStatus: completedStatus || false,
		createdAt: new Date().toISOString(),
	};
	tasks.push(newTask);
	res.status(201).json(newTask);
});

// PUT /tasks/:id
router.put('/tasks/:id', (req, res) => {
	const { id } = req.params;
	const { title, color, completedStatus } = req.body;
	const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

	if (taskIndex === -1) {
		return res.status(404).json({ error: 'Task not found' });
	}

	tasks[taskIndex] = { ...tasks[taskIndex], title, color, completedStatus };
	res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id
router.delete('/tasks/:id', (req, res) => {
	const { id } = req.params;
	const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

	if (taskIndex === -1) {
		return res.status(404).json({ error: 'Task not found' });
	}

	tasks.splice(taskIndex, 1);
	res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = router;
