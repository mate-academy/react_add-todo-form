import { ChangeEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

const getUserByID = (id: number) => {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
};

const findMaxId = (todos: Todo[]) => {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids) + 1;
};

export const App = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer.map(todo => ({
    ...todo,
    user: getUserByID(todo.userId),
  })));
  const [error, setError] = useState({ title: false, user: false });

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!id || !trimmedTitle) {
      setError({
        title: !trimmedTitle,
        user: !id,
      });

      return;
    }

    const newTodo = {
      id: findMaxId(todos),
      title: trimmedTitle,
      completed: false,
      userId: id,
      user: getUserByID(id),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setId(0);
    setError({ title: false, user: false });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setError((prevState) => ({ ...prevState, title: false }));
  };

  const handleIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setId(+event.target.value);
    setError((prevState) => (
      { ...prevState, user: event.target.value === '0' }
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {(error.title) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={id}
            onChange={handleIdChange}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {(error.user) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
