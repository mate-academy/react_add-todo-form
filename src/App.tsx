import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [titleErrorMessage, setHasTitleErrorMessage] = useState('');
  const hasTitleError = titleErrorMessage !== '';

  function getNewPostId(todosList: Todo[]) {
    const maxId = Math.max(...todosList.map(todo => todo.id));

    return maxId + 1;
  }

  const isValidTitle = (inputedValue: string) => {
    const regex = /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s]*$/;

    return regex.test(inputedValue);
  };

  const addNewTodo = (newTodo: Todo) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setTodos(todos => [...todos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    if (!title.trim()) {
      setHasTitleErrorMessage('Enter a title');

      return;
    } else if (!isValidTitle(title)) {
      setHasTitleErrorMessage('Input should contain only UA and EN');

      return;
    }

    if (userId === 0) {
      setHasUserError(true);

      return;
    }

    if (!userId || titleErrorMessage) {
      return;
    }

    const newTodo: Todo = {
      id: getNewPostId(todos),
      title,
      userId,
      completed: false,
    };

    addNewTodo(newTodo);

    reset();
  };

  const handleUserChange = (evnt: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+evnt.target.value);

    setHasUserError(+evnt.target.value === 0);
  };

  const handleTitleChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evnt.target.value;

    setTitle(input);
    if (input.trim()) {
      setHasTitleErrorMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="select_user">Title: </label>
          <input
            placeholder="Enter your task"
            id="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">{titleErrorMessage}</span>}
        </div>

        <div className="field">
          <label htmlFor="select_user">User: </label>
          <select
            id="select_user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
