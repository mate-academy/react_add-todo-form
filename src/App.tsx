import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import './App.scss';
import { Todo } from './components/types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);
  const [userError, setUserError] = useState({
    userId: false,
    title: false,
  });

  const maxId = Math.max(...todos.map(todo => Number(todo.id)), 0);
  const [inputTodo, setInputTodo] = useState(
    {
      id: maxId + 1,
      title: '',
      completed: false,
      userId: 0,
    },
  );

  function reset() {
    setInputTodo({
      id: maxId + 1,
      title: '',
      completed: false,
      userId: 0,
    });
  }

  function handleOnChange(
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    let newValue = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setInputTodo(prevState => (
      {
        ...prevState,
        [fieldName]: newValue,
      }
    ));

    setUserError(prevState => ({
      ...prevState,
      [fieldName]: false,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    let hasError = false;

    if (inputTodo.userId === 0) {
      setUserError(prevState => ({
        ...prevState,
        userId: true,
      }));
      hasError = true;
    }

    const trimmedTitle = inputTodo.title.trim();

    if (!trimmedTitle) {
      setUserError(prevState => ({
        ...prevState,
        title: true,
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, {
      ...inputTodo,
      id: maxId + 1,
      title: trimmedTitle,
    }]);
    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            onChange={(event) => handleOnChange('title', event)}
            value={inputTodo.title}
            placeholder="Enter a title"
          />
          {userError.title
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={inputTodo.userId}
            onChange={(event) => handleOnChange('userId', event)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(us => (
              <option value={us.id} key={us.id}>{us.name}</option>
            ))}
          </select>

          {userError.userId
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
