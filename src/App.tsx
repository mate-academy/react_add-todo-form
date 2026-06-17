import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/TodoInfo/TodoInfo';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const foundUser = usersFromServer.find(user => user.id === todo.userId);

  const processedTodo: Todo = {
    ...todo,
    user: undefined,
  };

  if (foundUser) {
    processedTodo.user = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
    };
  }

  return processedTodo;
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const cleanValue = changeEvent.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g,
      '',
    );

    setTitle(cleanValue);
    setTitleError(false);
  };

  const handleUserChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(changeEvent.target.value));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = userId === 0;

    if (isTitleInvalid) {
      setTitleError(true);
    }

    if (isUserInvalid) {
      setUserError(true);
    }

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const foundUser = usersFromServer.find(element => element.id === userId);
    const allId = todos.map(todoItem => todoItem.id);
    const newId = allId.length > 0 ? Math.max(...allId) + 1 : 1;

    if (!foundUser) {
      return;
    }

    const newTodo: Todo = {
      title: title.trim(),
      id: newId,
      completed: false,
      userId: userId,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
      },
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {/* Додали label та id */}
          <label htmlFor="user-select">Assignee</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(element => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList items={todos} />
    </div>
  );
};
