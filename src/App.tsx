import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const todos = todosFromServer.map(
  todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }),
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!+selectedUser) {
      setUserError(true);
    }

    if (title && +selectedUser) {
      const newTodo: Todo = {
        title,
        userId: +selectedUser,
        user: usersFromServer.find(user => user.id === +selectedUser),
        completed: false,
        id: [...allTodos].sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
      };

      setAllTodos(currentTodos => [...currentTodos, newTodo]);

      setTitle('');
      setTitleError(false);
      setSelectedUser('0');
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            placeholder="Enter a title"
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            defaultValue="0"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
