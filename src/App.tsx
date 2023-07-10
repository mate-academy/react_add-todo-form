import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import { Todo } from './services/types';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id);
}

const todosWithUser = (): Todo[] => {
  return todosFromServer.map(todo => {
    return {
      ...todo,
      user: getUserById(todo.id),
    };
  });
};

const titlePatter = /[^a-zA-Zбвгґджзклмнпрстфхцчшщйаеєиіїоуюяь\d\s]/gm;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(true);

  const [user, setUser] = useState(0);
  const [isUserValid, setIsUserValid] = useState(true);

  const [completed] = useState(false);

  const reset = () => {
    setTitle('');
    setUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let abortSubmit = false;

    if (!title) {
      setIsTitleValid(false);
      abortSubmit = true;
    }

    if (!user) {
      setIsUserValid(false);
      abortSubmit = true;
    }

    if (abortSubmit) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed,
      userId: user,
      user: getUserById(user),
    };

    setTodos([...todos, newTodo]);
    reset();
  };

  const handleTitleOnChange = (value: string) => {
    const normalizedTitle = value.replace(titlePatter, '');

    setTitle(normalizedTitle);
    setIsTitleValid(true);
  };

  const handleUserOnChange = (value: number) => {
    setUser(value);
    setIsUserValid(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleOnChange(event.currentTarget.value)}
            placeholder="Enter a title"
          />
          {!isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="user"
            data-cy="userSelect"
            onChange={event => handleUserOnChange(+event.currentTarget.value)}
            value={user}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option value={id}>{name}</option>
            ))}
          </select>

          {!isUserValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
