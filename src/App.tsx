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

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [submit, setSubmit] = useState(false);

  const hasErrorTitle = newTodoTitle === '';
  const hasErrorUser = selectedUserId === 0;

  const getTodoId = () => (
    todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1
  );

  const getUserId = () => {
    const user = [...usersFromServer]
      .find(person => person.id === selectedUserId);

    if (user) {
      return user.id;
    }

    return null;
  };

  const findUser = () => (
    usersFromServer.find(user => user.id === selectedUserId)
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
          setSubmit(true);
          if (!hasErrorUser && !hasErrorTitle) {
            const newVisibleTodo = [
              ...visibleTodos,
              newTodo,
            ];

            setVisibleTodos(newVisibleTodo);
            setNewTodoTitle('');
            setSelectedUserId(0);
            setSubmit(false);
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
          {(hasErrorTitle && submit) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              name="selectedUser"
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(+event.target.value);
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

          {(hasErrorUser && submit) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
