import React, { useState, useEffect } from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Types/Types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  useEffect(() => {
    if (title.length > 0) {
      setErrorTitle(false);
    }

    if (userId !== 0) {
      setErrorSelect(false);
    }
  }, [title, userId]);

  const addTodo = () => {
    let maxId = 0;

    if (todos.length > 0) {
      maxId = Math.max(...todos.map((todo: Todo) => todo.id)) + 1;
    }

    const newTodo = [...todos, {
      id: maxId, title, userId, completed,
    }];

    setTodos(newTodo);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId === 0) {
      setErrorSelect(true);
    }

    if (title.length === 0) {
      setErrorTitle(true);
    }

    if (title.length !== 0 && userId !== 0) {
      addTodo();
      setTitle('');
      setUserId(0);
    }
  };

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => (todo.userId === user.id)) || null,
  }));

  return (
    <div className="App">
      <h1 className="title is-1">Add todo form</h1>
      <form
        className="form"
        onSubmit={submitForm}
      >
        {errorTitle
        && <span className="has-text-danger">Please enter the title</span>}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          data-cy="titleInput"
          placeholder="Title"
          className="input is-primary my-1"
        />
        {errorSelect
        && <span className="has-text-danger">Please choose a user</span>}
        <div className="select is-primary my-1">
          <select
            data-cy="userSelect"
            className="select"
            value={userId === 0 ? 'Choose a user' : userId}
            onChange={(e) => setUserId(+e.target.value)}
          >
            <option value="Choose a user" disabled>Choose a user</option>
            {users
              .map(user => (
                <option
                  key={user.id}
                  label={user.name}
                >
                  {user.id}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="button is-primary my-2"
        >
          ADD
        </button>
      </form>
      <TodoList preparedTodos={preparedTodos} />
    </div>
  );
};

export default App;
