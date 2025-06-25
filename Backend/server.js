const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./Config/database');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task({ text: req.body.text, completed: false });
  await task.save();
  res.json(task);
});

app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log('To-Do Backend running on port 5000'));