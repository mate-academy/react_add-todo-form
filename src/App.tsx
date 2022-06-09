import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './react-app-env';
import { TodoList } from './api/componets/TodoList';

const App: React.FC = () => {
  const [titleToAdd, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [allTodos, setTask] = useState([...todos]);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser || !titleToAdd) {
      if (!selectedUser) {
        setUserError('Please choose a user');
      }

      if (!titleToAdd) {
        setTitleError('Please enter the title');
      }
    } else {
      const taskId: number
    = [...todos].sort((todo1, todo2) => todo2.id - todo1.id)[0].id;

      const newTask: Todo = {
        id: taskId + 1,
        title: titleToAdd,
        userId: selectedUser,
        completed: false,
      };

      setTask(currentTasks => [...currentTasks, newTask]);
      setTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1 className="main-title">Todos list</h1>
      <TodoList todos={allTodos} />

      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">
          Add new task
        </label>
        <input
          type="text"
          id="title"
          value={titleToAdd}
          placeholder="title"
          onChange={event => {
            setTitle(event.target.value);
            setTitleError('');
          }}
        />
        <span className="error">{titleError}</span>

        <select
          value={selectedUser}
          onChange={event => {
            setSelectedUser(+event.target.value);
            setUserError('');
          }}
          id="selectValidate"
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <span className="error">{userError}</span>
        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
