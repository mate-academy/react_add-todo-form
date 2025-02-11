import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { useState } from 'react';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
function getUserById(userId): User {
  const userr = usersFromServer.find(user => user.id === userId) || null;

  return {
    id: userr.id,
    name: userr.name,
    username: userr.username,
    email: userr.email,
  };
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTodoError, setHasTodoError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [currentTodos, setTodos] = useState(todos);
  const [selectedUser, setSelectedUser] = useState(0);

  const handleTitleChange = event => {
    const cleanedTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g,
      '',
    );

    setTodoTitle(cleanedTitle);
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      setHasTodoError(true);

      return;
    } else if (selectedUser === 0) {
      setHasUserError(true);

      return;
    }

    const newUser = getUserById(selectedUser);
    const newTodo = {
      id: Math.max(...currentTodos.map(todoo => todoo.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: selectedUser,
    };

    setTodos([...currentTodos, { user: newUser, ...newTodo }]);
    setSelectedUser(0);
    setTodoTitle('');
    setHasUserError(false);
    setHasTodoError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={e => handleSubmit(e)}>
        <div className="field">
          <input
            placeholder="Enter todo"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={eventt => {
              handleTitleChange(eventt);
              setHasTodoError(false);
            }}
            required
          />
          {hasTodoError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {' '}
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
