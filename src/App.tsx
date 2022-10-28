import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [titleField, setTitleField] = useState('');
  const [initialTodos, setInitialTodos] = useState(todosFromServer);
  const [touched, setTouched] = useState(false);

  const titleError = !titleField && touched;
  const selectedError = !selectedUser && touched;

  const clearForm = () => {
    setTitleField('');
    setSelectedUser('');
  };

  const addTodo = () => {
    setInitialTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: currentTodos.length + 1,
          title: titleField,
          completed: false,
          userId: +selectedUser,
        },
      ];
    });
  };

  const handleAdd = () => {
    if (titleError || selectedError || !touched) {
      setTouched(true);

      return;
    }

    addTodo();
    clearForm();
  };

  const expandedTodos = initialTodos.map(todo => {
    return {
      ...todo,
      userRef: usersFromServer.find(user => (user.id === todo.userId)) || null,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => event.preventDefault()}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleField}
              onChange={event => (setTitleField(event.target.value))}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span> }
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => (setSelectedUser(event.target.value))}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectedError && <span className="error">Please choose a user</span>}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAdd}
        >
          Add
        </button>
        <TodoList todos={expandedTodos} />
      </form>
    </div>
  );
};
