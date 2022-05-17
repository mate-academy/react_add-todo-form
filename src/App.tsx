import React, { useState } from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);

  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const preparedUsers = usersFromServer.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (todoTitle && userId) {
      const newTodo = {
        userId,
        id: todosFromServer[todosFromServer.length - 1].id + 1,
        title: todoTitle,
        completed: false,
        user: usersFromServer.find(user => user.id === userId),
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="todoForm"
        onSubmit={handleFormSubmit}
      >
        <div>
          <input
            className="todoForm__input"
            type="text"
            value={todoTitle}
            onChange={handleInputChange}
            placeholder="Please enter a title"
          />

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div>
          <select
            className="todoForm__select"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            {preparedUsers}
          </select>

          {hasUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" className="todo__form__button">
          ➕
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
