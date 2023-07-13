import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoType } from './types/TodoType';
import { UserType } from './types/UserType';
import { TodoList } from './components/TodoList';

function getUser(userId: number): UserType | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const getTodos: TodoType[] = todosFromServer.map(todo => ({
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

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!selectedUser || !title.trim()) {
      return;
    }

    const maxId = todos.map((todo) => (todo.id));
    const newId = Math.max(...maxId) + 1;

    const newTodo: TodoType = {
      id: newId,
      completed: false,
      user: getUser(Number(selectedUser)),
      title: title.trim(),
      userId: selectedUser,
    };

    setTodos([...todos, newTodo]);

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
