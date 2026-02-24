import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const getUserById = (id: number): User => {
    return usersFromServer.find(user => user.id === id) || usersFromServer[0];
  };

  const preparedTodos: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const generateNewTodoId = () => {
    return todos.length ? Math.max(...todos.map(todoItem => todoItem.id)) + 1 : 1;
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUserId('0');
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const isUserSelected = selectedUserId !== '0';

    setTitleError(!trimmedTitle);
    setUserError(!isUserSelected);

    if (!trimmedTitle || !isUserSelected) {
      return;
    }

    const userIdNumber = Number(selectedUserId);

    const newTodo: Todo = {
      id: generateNewTodoId(),
      title: trimmedTitle,
      completed: false,
      userId: userIdNumber,
      // якщо у твоєму типі Todo поле user опціональне — можна не додавати.
      // Але додати корисно, щоб не було undefined у TodoInfo/UserInfo:
      user: getUserById(userIdNumber),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div>
          <label htmlFor="userSelect">User:</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit">Add</button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
