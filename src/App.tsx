import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const usersList = [...usersFromServer].map(user => user.name);

  usersList.unshift('Choose a user');

  const [selectedUser, setSelectedUser] = useState('0');
  const [selectUserName, setSelectedUserName] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [clicked, setClicked] = useState(false);
  const hasErrorTitle = clicked && !newTodoTitle;
  const hasErrorUser = clicked && selectedUser === '0';

  const getTodoId = () => (
    todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1
  );

  const getUserId = () => {
    const userId = [...usersFromServer]
      .find(user => user.name === selectUserName);

    if (userId) {
      return userId.id;
    }

    return null;
  };

  const findUser = () => (
    usersFromServer.find(user => user.name === selectUserName)
  );

  const newTodo = {
    id: getTodoId(),
    title: newTodoTitle,
    userId: getUserId(),
    completed: false,
    user: findUser(),
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (clicked && !hasErrorUser && !hasErrorTitle) {
            const newVisibleTodo = [
              ...visibleTodos,
              newTodo,
            ];

            setVisibleTodos(newVisibleTodo);
            setNewTodoTitle('');
            setSelectedUser('0');
            setClicked(false);
          }
        }}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              value={newTodoTitle}
              placeholder="Enter a title"
              onChange={(event) => {
                setNewTodoTitle(event.target.value);
              }}
            />
          </label>
          {hasErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              name="selectedUser"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setSelectedUserName(event.target.selectedOptions[0].innerText);
              }}
            >
              {usersList.map(user => (
                <option
                  key={user}
                  value={usersList.indexOf(user)}
                  disabled={usersList.indexOf(user) === 0}
                >
                  {user}
                </option>
              ))}

            </select>
          </label>

          {hasErrorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            setClicked(true);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
