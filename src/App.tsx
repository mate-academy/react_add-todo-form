import { useState } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './components/Todo';

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [todo, setTodo] = useState<Todo[]>(todosFromServer);
  const [hasTitlError, setHasTitleError] = useState<boolean>(false);
  const [hasUserError, setHasUserError] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const handleBlur = () => {
    setTouched(true);

    if (!title.trim()) {
      setHasTitleError(true);
    } else {
      setHasTitleError(false);
    }

    if (userId === 0) {
      setHasUserError(true);
    } else {
      setHasUserError(false);
    }
  };

  const addTodo = (newTodo: Todo) => {
    setTodo(currentTodos => [...currentTodos, newTodo]);
  };

  const handleUserSelectChange
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue: number = +event.target.value;

      if (selectedValue) {
        setUserId(selectedValue);
        setHasUserError(false);
      } else {
        setHasUserError(true);
      }
    };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    setTitle(newValue);

    setHasTitleError(newValue.trim() === '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || title.trim() === '') {
      setHasUserError(!userId);
      setHasTitleError(title.trim() === '');
      setTouched(true);

      return;
    }

    const maxId = Math.max(...todo.map((t) => t.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
    setHasUserError(false);
    setHasTitleError(false);
    setTouched(false);
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
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            placeholder="Enter a title"
          />
          {hasTitlError
            && touched
            && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label className="label" htmlFor="name">
            User:
          </label>
          <select
            id="name"
            value={userId}
            onChange={handleUserSelectChange}
            onBlur={handleBlur}
            data-cy="userSelect"
            required
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user) => {
              return (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>

              );
            })}
          </select>

          {hasUserError
            && touched
            && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todo}
      />
    </div>
  );
};
