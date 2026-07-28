import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User | null;
}

export const App = () => {
  const DEFAULT_USER_OPTION = '0';
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUserValue, setSelectedUserValue] =
    useState(DEFAULT_USER_OPTION);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(currentUser => {
      return currentUser.id === todo.userId;
    });

    return {
      id: todo.id,
      userId: todo.userId,
      title: todo.title,
      completed: todo.completed,
      user: user || null,
    };
  });
  const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = usersFromServer.find(currentUser => {
      return String(currentUser.id) === selectedUserValue;
    });

    if (inputTitle.length === 0 && selectedUserValue === DEFAULT_USER_OPTION) {
      setTitleError(true);
      setSelectError(true);
    } else if (selectedUserValue === DEFAULT_USER_OPTION) {
      setSelectError(true);
      setTitleError(false);
    } else if (inputTitle.length === 0) {
      setTitleError(true);
      setSelectError(false);
    } else {
      setTitleError(false);
      setSelectError(false);
      // enviar o formulário abaixo
      if (!user) {
        return;
      }

      setTodos(currentTodos => [
        ...currentTodos,
        {
          id: Math.max(...currentTodos.map(todo => todo.id), 0) + 1,
          userId: user.id,
          title: inputTitle,
          completed: false,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        },
      ]);

      // limpa os inputs
      setInputTitle('');
      setSelectedUserValue('0');
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Enter a title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={inputTitle}
            onChange={event => {
              setInputTitle(event.target.value);
              setTitleError(false);
            }}
          />
          <span className="error">
            {titleError ? 'Please enter a title' : ''}
          </span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">Choose a user</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUserValue}
            onChange={event => {
              setSelectedUserValue(event.target.value);
              setSelectError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          <span className="error">
            {selectError ? 'Please choose a user' : ''}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
