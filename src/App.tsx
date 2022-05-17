import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map((todo) => ({
  ...todo,
  user: users.find((user => user.id === todo.userId)) || null,
}));

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserID] = useState(0);
  const [hasUserIdError, setUserIDError] = useState(false);
  const [tasks, setTasks] = useState(preparedTodos);
  const [completed, setCompleted] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    setUserIDError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    setTitle('');

    if (userId === 0) {
      setUserIDError(true);
    }

    if (title.trim() !== '' && userId !== 0) {
      const newTask = {
        userId,
        id: tasks.length + 1,
        title,
        completed,
        user: users.find((user => user.id === userId)) || null,
      };

      setTasks([...tasks, newTask]);
      setTitle('');
      setUserID(0);
      setCompleted(false);
    }
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && (
            <span className="error">Please enter the title</span>
          )}
        </div>

        <div>
          <select
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => {
              setCompleted(event.target.checked);
            }}
          />
          Completed
        </div>
        <button type="submit">Add</button>
      </form>

      <TodoList todo={tasks} />
    </div>
  );
};

export default App;
