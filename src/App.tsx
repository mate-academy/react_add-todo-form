import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';
import { User } from './Types/User';

const fullTodos = todosFromServer.map(elem => {
  return {
    ...elem,
    user: usersFromServer.find(user => user.id === elem.userId) as User,
  };
});

export const App = () => {
  const [todosList, setTodosList] = useState<Todo[]>(fullTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isTitleFilled, setIsTitleFilled] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  function getLastIndex(): number {
    return Math.max(...todosList.map(currentTodo => currentTodo.id)) + 1;
  }

  const addTodo = (newTodo: Todo) => {
    setTodosList(currentTodo => [...currentTodo, newTodo]);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleFilled(true);
  };

  const selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserSelected(true);
  };

  function reset() {
    setTitle('');

    setIsTitleFilled(true);
    setIsUserSelected(true);
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleFilled(!!title);
    setIsUserSelected(!!selectedUser);

    if (!selectedUser || !title) {
      return;
    }

    addTodo({
      id: getLastIndex(),
      title,
      completed: false,
      user: usersFromServer.find(user => user.id === selectedUser) as User,
      userId: selectedUser,
    });

    setSelectedUser(0);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => submitHandler(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => titleHandler(event)}
          />
          {!isTitleFilled && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => selectUserHandler(event)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
