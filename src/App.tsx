import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(getTodos);
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const formOnSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setUserError(true);
    }

    if (title === '' && selectedUser === 0) {
      setTitleError(true);
      setUserError(true);
    }

    if (title !== '' && selectedUser !== 0) {
      const maxId = todos.map((todo) => (todo.id));
      const newId = Math.max(...maxId) + 1;

      const newTodo: Todo = {
        id: newId,
        completed: false,
        user: getUser(selectedUser),
        title,
        userId: selectedUser,
      };

      setTodos([...todos, newTodo]);
    }

    setTitle('');
    setSelectedUser(0);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={formOnSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (user
              && (<option value={user.id} key={user.id}>{user.name}</option>)
            ))}

          </select>
          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
