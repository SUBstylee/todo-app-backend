import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import prisma from './prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	}),
);
app.use(bodyParser.json());

app.get('/health', (req, res) => res.status(200).send('Server is healthy'));

app.get('/tasks', async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	try {
		const tasks = await prisma.task.findMany({
			skip: parseInt(skip, 10),
			take: parseInt(limit, 10),
		});
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tasks' });
	}
});

app.get('/tasks/:id', async (req, res) => {
	const { id } = req.params; // Retrieve the ID from the URL
	try {
		const task = await prisma.task.findUnique({
			where: { id: parseInt(id, 10) }, // Look for the task by the given ID
		});

		if (!task) {
			return res.status(404).json({ error: 'Task not found' }); // Return an error if task not found
		}

		res.status(200).json(task); // Send the found task as a response
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch task' });
	}
});

app.post(
	'/tasks',
	body('title').isString().notEmpty().withMessage('Title is required'),
	body('color')
		.optional()
		.isHexColor()
		.withMessage('Color must be a valid hex code'),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, color = '#fff' } = req.body;

		try {
			const newTask = await prisma.task.create({
				data: { title, color, completedStatus: false },
			});
			res.status(201).json(newTask);
		} catch (error) {
			res.status(500).json({ error: 'Failed to create task' });
		}
	},
);

app.put(
	'/tasks/:id',
	body('title').isString().notEmpty().withMessage('Title is required'),
	body('color')
		.optional()
		.isHexColor()
		.withMessage('Color must be a valid hex code'),
	body('completedStatus').optional().isBoolean(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { title, color, completedStatus } = req.body;

		console.log('Update Request:', { id, title, color, completedStatus });

		try {
			const updatedTask = await prisma.task.update({
				where: { id: parseInt(id, 10) },
				data: { title, color, completedStatus },
			});
			res.status(200).json(updatedTask);
		} catch (error) {
			console.error('Update task failed:', error);
			res.status(500).json({ error: 'Failed to update task' });
		}
	},
);

app.delete('/tasks/:id', async (req, res) => {
	const { id } = req.params;

	try {
		await prisma.task.delete({ where: { id: parseInt(id, 10) } });
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete task' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
