import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './react-app-env';

const getUser = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todoWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [todos, setTodos] = useState<TodoWithUser[]>(todoWithUser);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId) || null,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const clearButtonClick = () => {
    setIsButtonClicked(false);
  };

  const clearTitle = () => {
    setTitle('');
  };

  const clearSelectedUserId = () => {
    setSelectedUserId(0);
  };

  const isValidTitle = (text: string) => {
    const pattern = /[$&+,:;=?@#|№<>."_^*()%!]/g;

    return !pattern.test(text);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.currentTarget.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    clearButtonClick();
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsButtonClicked(true);

    if (title.trim() && selectedUserId && isValidTitle(title)) {
      addTodo();
      clearTitle();
      clearSelectedUserId();
      clearButtonClick();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="createTitle">
            Tilte:&nbsp;
          </label>

          <input
            id="createTitle"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleInputChange}
          />

          {isButtonClicked
          && !title
          && (
            <span className="error">
              &nbsp;Please enter a title &#128521;
            </span>
          )}

          {isButtonClicked
          && !isValidTitle(title)
          && (
            <span className="error">
              &nbsp;The title can contain only letters,
              numbers and spaces &#9757;
            </span>
          )}

          {isButtonClicked
          && !title.trim()
          && title
          && (
            <span className="error">
              &nbsp;The title cannot contain only spaces &#128575;
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">
            User:&nbsp;
          </label>

          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isButtonClicked
          && !selectedUserId
          && (
            <span className="error">
              &nbsp;Please choose a user &#128521;
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={onSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
