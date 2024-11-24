import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo, Todos } from './types/todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<Todos>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');

  const getMaxId = (allTodos: Todos) => {
    const newTodoId = Math.max(...allTodos.map(todo => todo.id));

    return newTodoId + 1;
  };

  const handeTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError(false);
  };

  const handleNewTodo = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (selectedUser === '0') {
      setUserError(true);
      hasError = true;
    }

    if (title === '') {
      setTitleError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxId(todos),
      title: title,
      completed: false,
      userId: +selectedUser,
    };

    setTitle('');
    setSelectedUser('0');

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Enter a title: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handeTitleChange}
            placeholder="Enter a title"
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">Choose a user: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.username}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" onClick={handleNewTodo} data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
