import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitle, setIsTitle] = useState(true);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const userSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserSelected(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId === 0) {
      setIsUserSelected(false);
    }

    if (title.length === 0) {
      setIsTitle(false);
    }

    if (userId !== 0 && title.length !== 0) {
      const newTodo = {
        userId,
        id: todos.length + 1,
        title,
        completed: false,
      };

      setTodos((current) => [...current, newTodo]);

      setTitle('');
      setUserId(0);
      setIsUserSelected(true);
      setIsTitle(true);
    }
  };

  return (
    <div className="container">
      <TodoList todos={todos} />
      <form
        className="d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mb-3"
          type="text"
          value={title}
          placeholder="Enter a new task"
          onChange={titleHandler}
        />
        {isTitle || (
          <p className="text-danger">Please enter the title</p>
        )}

        <select
          className="form-select mb-3"
          value={userId}
          onChange={userSelectHandler}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {isUserSelected || (
          <p className="text-danger">Please choose a user</p>
        )}

        <button
          className="btn btn-success"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
