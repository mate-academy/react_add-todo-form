import React, { useState } from 'react';
import './App.scss';
import { Todo } from './components/types/Todo';
import { User } from './components/types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const [selectedUser, setSelectedUser] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const currentMax = Math.max(...currentTodos.map(todo => todo.id));

  const createNewTodo = () => {
    const newTodo = {
      id: currentMax + 1,
      title: todoTitle,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    return newTodo;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setUserError(!selectedUser);
    setTitleError(!todoTitle);

    if (!todoTitle || !selectedUser) {
      return;
    }

    setCurrentTodos((prev) => (
      [...prev, createNewTodo()]
    ));
    setSelectedUser(0);
    setTodoTitle('');
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const selectUserHandler = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setUserError(false);
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            value={todoTitle}
            data-cy="titleInput"
            onChange={titleHandler}
            placeholder="Title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={selectUserHandler}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
