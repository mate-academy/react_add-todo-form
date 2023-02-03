import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const todosWithUser: Todo[] = todosFromServer.map(todo => {
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

  const MaxId = Math.max(...todos.map(todo => todo.id));

  const resetForm = () => {
    setTitleInput('');
    setUserSelect('');
    setFormChecked(false);
  };

  const addNewTodo = () => {
    const selectedUser = usersFromServer
      .find(user => user.name === userSelect) as User;

    const newTodo = {
      id: MaxId + 1,
      title: titleInput,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
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
    <div>
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmitTodo}
        >

          <div className="field" />
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
    </div>
  );
};
