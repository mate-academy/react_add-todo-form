import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { pattern } from './services/pattern';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [HasUserIdError, setHasUserIdError] = useState(false);

  const [todo, setTodo] = useState(initialTodos);

  const addTodo = () => {
    const prevTodoId = Math.max(...todo.map(prevTodo => prevTodo.id));
    const newTodoId = prevTodoId + 1;
    const newTodo: Todo = {
      id: newTodoId,
      title,
      userId,
      user: getUserById(userId),
      completed: false,
    };

    setTodo((prevTodo) => ([...prevTodo, newTodo]));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    if (!pattern.test(newTitle)) {
      setHasTitleError(true);
    } else {
      setHasTitleError(false);
      setTitle(newTitle);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo();
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && (
            <span className="error">
              {`Please enter a name. 
              Use letters UA and EN, numbers and spaces.`}
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {HasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onSubmit={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todo} />

    </div>
  );
};
