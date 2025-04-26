import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return alert("Please enter a task!");

    const newTodo = { task, priority, completed: false };

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = newTodo;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setTask('');
    setPriority('medium');
  };

  const handleEdit = (index) => {
    setTask(todos[index].task);
    setPriority(todos[index].priority);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodos(filtered);
  };

  const handleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const renderPriorityBadge = (level) => {
    switch (level) {
      case 'high':
        return <span className="badge bg-danger">High</span>;
      case 'medium':
        return <span className="badge bg-warning text-dark">Medium</span>;
      case 'low':
        return <span className="badge bg-success">Low</span>;
      default:
        return level;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center bg-primary text-white py-3 rounded">
          <h1>Todos Application</h1>
        </div>
      </div>

      <div className="row mt-4">
        {/* Task List */}
        <div className="col-md-6 border-end">
          <h3 className="text-center mb-3"> Active Tasks</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos
                .map((todo, index) => ({ ...todo, index }))
                .filter(todo => !todo.completed)
                .map((todo) => (
                  <tr key={todo.index}>
                    <td>{todo.task}</td>
                    <td>{renderPriorityBadge(todo.priority)}</td>
                    <td>
                      <button className="btn btn-success btn-sm me-1" onClick={() => handleComplete(todo.index)}>
                        Complete
                      </button>
                      <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(todo.index)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              {todos.filter(todo => !todo.completed).length === 0 && (
                <tr><td colSpan="3" className="text-center text-muted">No active tasks</td></tr>
              )}
            </tbody>
          </table>

          <h3 className="text-center mt-5 mb-3 text-success">Completed Tasks</h3>
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos
                .map((todo, index) => ({ ...todo, index }))
                .filter(todo => todo.completed)
                .map((todo) => (
                  <tr key={todo.index}>
                    <td className="text-decoration-line-through">{todo.task}</td>
                    <td>{renderPriorityBadge(todo.priority)}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm me-1" onClick={() => handleComplete(todo.index)}>
                        Undo
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              {todos.filter(todo => todo.completed).length === 0 && (
                <tr><td colSpan="3" className="text-center text-muted">No completed tasks</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Task */}
        <div className="col-md-6">
          <h3 className="text-center">{editIndex !== null ? ' Update Task' : ' Add Task'}</h3>
          <div className="mb-3">
            <label className="form-label">Task</label>
            <input
              type="text"
              className="form-control"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
            {editIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
