import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [todoList, setTodoList] = useState([...preparedTodos]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (title && userId) {
      const todo = {
        id: todos.length + 1,
        title,
        completed: false,
        userId,
        user: users.find(user => user.id === userId) || null,
      };

      setTodoList([...todoList, todo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <div className="form_container">
        <form
          action="get"
          className="form"
          onSubmit={onSubmit}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="form_input" className="form_label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="form_input"
            className="form_title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              const { value } = event.target;

              setTitle(value);
              setTitleError(false);
            }}
          />

          {titleError && <div className="error">Please enter a title</div>}

          <select
            name="user"
            value={userId}
            className="form_select"
            onChange={(event) => {
              const { value } = event.target;

              setUserId(+value);
              setUserIdError(false);
            }}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <div className="error">Please choose a user</div>}

          <div>
            <button type="submit" className="form_button">
              Add
            </button>
          </div>

        </form>
      </div>

      <div className="page-content">
        <TodoList todos={todoList} />
      </div>

    </div>
  );
};

export default App;
