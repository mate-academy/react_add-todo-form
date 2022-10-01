import './App.scss';
import React, { useState, useEffect } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const addUser = () => {
  const newTodo = todosFromServer.map(todo => {
    // eslint-disable-next-line max-len
    const userToAdd = usersFromServer.find(user => user.id === todo.userId) || null;

    return {
      ...todo,
      userToAdd,
    };
  });

  return newTodo;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(addUser());
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [errorVisiableUser, setErrorVisiableUser] = useState(false);
  const [errorVisiableTitle, setErrorVisiableTitle] = useState(false);

  useEffect(() => {
    if (selectedUserId) {
      setErrorVisiableUser(false);
    }

    if (newTodoTitle) {
      setErrorVisiableTitle(false);
    }
  }, [selectedUserId, newTodoTitle]);

  const handleSuccess = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (selectedUserId && newTodoTitle) {
      setTodos([
        ...todos,
        {
          userId: selectedUserId,
          id: todos.length + 1,
          title: newTodoTitle,
          completed: false,
          // eslint-disable-next-line max-len
          userToAdd: usersFromServer.find(user => user.id === selectedUserId) || null,
        },
      ]);

      setSelectedUserId(0);
      setNewTodoTitle('');
    }

    if (!newTodoTitle) {
      setErrorVisiableTitle(true);
    }

    if (!selectedUserId) {
      setErrorVisiableUser(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => {
        handleSuccess(event);
      }}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={newTodoTitle}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          {errorVisiableTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              handleSelectChange(event);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {errorVisiableUser && (
            <span className="error">Please chose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
