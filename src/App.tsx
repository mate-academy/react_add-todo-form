import { FormEvent, useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todosFromServer from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = users.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const validation = () => {
    let spaces = 0;

    if (selectedUserId && title.trim()) {
      return true;
    }

    if (selectedUserId === '') {
      setSelectedUserError(true);
    }

    if (title.includes(' ')) {
      for (let i = 0; i < title.length; i += 1) {
        if (title[i] === ' ') {
          spaces += 1;
        }
      }
    }

    if (title === '' || spaces === title.length) {
      setTitleError(true);
    }

    return false;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title,
      userId: +selectedUserId,
      completed: false,
      user: getUser(Number(selectedUserId)),
    };

    setTodos(prevTodos => ([...prevTodos, newTodo]));
    setSelectedUserId('');
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event => {
                setTitle(event.target.value);
                setTitleError(false);
              })}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              name="user"
              onChange={(event) => {
                setSelectedUserId(event.target.value);
                setSelectedUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectedUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
