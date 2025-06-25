import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('https://taskflow-11x6.onrender.com/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!text.trim()) return;
    const res = await axios.post('https://taskflow-11x6.onrender.com/tasks', { text });
    setTasks([...tasks, res.data]);
    setText('');
  };

  const toggleTask = async (task) => {
    const res = await axios.patch(`https://taskflow-11x6.onrender.com/tasks/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => t._id === task._id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://taskflow-11x6.onrender.com/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            ✨ TaskFlow
          </h1>
          <p className="text-gray-400 text-lg">Stay organized, stay productive</p>
        </div>

        {/* Main card */}
        <div className="bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 border border-gray-700">
          {/* Add task section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                className="flex-1 p-4 bg-gray-700/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                value={text} 
                onChange={e => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?" 
              />
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Tasks counter */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{tasks.length} total tasks</span>
              <span>{tasks.filter(t => t.completed).length} completed</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: tasks.length > 0 ? `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Tasks list */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-400 text-lg">No tasks yet. Add one above to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <div 
                  key={task._id} 
                  className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
                    task.completed 
                      ? 'bg-gray-700/50 border-gray-600' 
                      : 'bg-gray-700/80 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <button
                      onClick={() => toggleTask(task)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 transition-all duration-200 ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-500 hover:border-green-400'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-4 h-4 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <span className={`text-lg transition-all duration-200 ${
                      task.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-white'
                    }`}>
                      {task.text}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => toggleTask(task)} 
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        task.completed
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {task.completed ? 'Undo' : 'Done'}
                    </button>
                    <button 
                      onClick={() => deleteTask(task._id)} 
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {tasks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-400">
                  Keep up the great work! 🚀
                </div>
                <button
                  onClick={() => {
                    const completedTasks = tasks.filter(t => t.completed);
                    completedTasks.forEach(task => deleteTask(task._id));
                  }}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                  disabled={tasks.filter(t => t.completed).length === 0}
                >
                  Clear completed ({tasks.filter(t => t.completed).length})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;