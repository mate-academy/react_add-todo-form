import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';
import './App.scss';

import { getUser } from './Helpers/getUser';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';

export const App: React.FC = () => {
  const [listOfTodos, setListOfTodos] = useState<Todo[]>(todosFromServer);
  const [newTodoTitle, setnewTodoTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number | string>(0);
  const [noTitle, setNoTitle] = useState<boolean>(false);
  const [noUserSelected, setNoUserSelected] = useState<boolean>(false);

  const todos: Todo[] = listOfTodos.map(todo => ({
    ...todo,
    user: getUser(todo.userId, usersFromServer),
  }));

  const addTodo = () => {
    if (newTodoTitle.length === 0 && selectedUser === 0) {
      setNoTitle(true);
      setNoUserSelected(true);

      return;
    }

    if (newTodoTitle.length === 0) {
      setNoTitle(true);

      return;
    }

    if (selectedUser === 0) {
      setNoUserSelected(true);

      return;
    }

    const findUser = usersFromServer.find(user => user.id === +selectedUser);

    const findMaxId = Math.max(...listOfTodos.map(todo => todo.id));

    if (findUser) {
      setListOfTodos((current => {
        return [
          ...current,
          {
            id: findMaxId + 1,
            userId: findUser.id,
            title: newTodoTitle,
            completed: false,
            user: findUser,
          },
        ];
      }));
    }

    setnewTodoTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={newTodoTitle}
            name="todoTitle"
            onChange={(event) => {
              setnewTodoTitle(event.currentTarget.value);
              setNoTitle(false);
            }}
          />
          {noTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userSelect"
            onChange={(event) => {
              setSelectedUser(event.target.value);
              setNoUserSelected(false);
            }}
            data-cy="userSelect"
            value={selectedUser}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {noUserSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
