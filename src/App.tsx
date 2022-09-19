import './App.scss';

import { ChangeEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const todos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }))
  .sort((todoA, todoB) => todoA.id - todoB.id);

export const App = () => {
  const [user, setUser] = useState('0');
  const [title, setTitle] = useState('');
  const [isSubmited, setSubmited] = useState(false);

  const users: User[] = usersFromServer;

  const handleUserSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value.includes('  ')) {
      setTitle(value.replace(/[^a-zA-Z0-9 ]/g, ''));
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validTitle = title.trim();

    if (validTitle !== '' && user !== '0') {
      todos.push({
        id: todos[todos.length - 1].id + 1,
        title: validTitle,
        completed: false,
        userId: Number(user),
        user: getUser(Number(user)),
      });

      setUser('0');
      setTitle('');
      setSubmited(false);
    } else {
      if (validTitle.length === 0) {
        setTitle('');
      }

      setSubmited(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleInput}
            />
          </label>
          {
            title === ''
            && isSubmited
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={user}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(userItem => (
                <option
                  value={userItem.id}
                  key={userItem.id}
                >
                  {userItem.name}
                </option>
              ))}
            </select>
          </label>
          {
            user === '0'
            && isSubmited
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
