import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoUser } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from "./types/user";

const todosWithUser: TodoUser[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [isFormChecked, setFormChecked] = useState(false);
  const [todos, setTodos] = useState(todosWithUser);

  const setTodoId = () => {
    const listId = todos.map(todo => todo.id);

    return Math.max(...listId) + 1;
  };

  const resetForm = () => {
    setTitleInput('');
    setUserSelect('');
    setFormChecked(false);
  };

  const addNewTodo = () => {
    const selectedUser = usersFromServer.find(user => user.name === userSelect);

    // if (!selectedUser) {
    //   throw new Error('no such user');
    // }

    // Used here type assertions couse I'm sure that I will get User object, above, my second option.
    const newTodo = {
      id: setTodoId(),
      title: titleInput,
      completed: false,
      userId: (selectedUser as User).id,
      user: selectedUser as User,
    };

    setTodos(prevTodos => ([
      ...prevTodos,
      newTodo,
    ]));

    resetForm();
  };

  const handleSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormChecked(true);

    if (titleInput && userSelect) {
      addNewTodo();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              value={titleInput}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={(event) => setTitleInput(event.target.value)}
            />
          </label>

          {(isFormChecked && !titleInput) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={(event) => setUserSelect(event.target.value)}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </select>
          </label>

          {(isFormChecked && !userSelect) && (
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
