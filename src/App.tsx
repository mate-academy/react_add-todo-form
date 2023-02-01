import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [titleText, setTitleText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [emptyField, setEmptyField] = useState(false);
  const [maxId, setMaxId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);

  const addUser = () => {
    let maxValue = 0;

    if (maxId <= maxValue) {
      for (let i = 0; i < todosFromServer.length; i += 1) {
        if (todosFromServer[i].id > maxValue) {
          maxValue = todosFromServer[i].id;
        }
      }

      setMaxId(maxValue + 1);
    } else {
      setMaxId(current => current + 1);
    }

    const person = usersFromServer
      .filter(human => human.id === +selectedUser)[0];

    if (titleText && selectedUser) {
      const newUser = {
        id: maxId,
        title: titleText,
        completed: false,
        userId: person.id,
      };

      setTodos([...todos, newUser]);
      setTitleText('');
      setSelectedUser('');
      setEmptyField(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!titleText || !selectedUser) {
      setEmptyField(true);

      return;
    }

    addUser();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={titleText}
            onChange={(({ target }) => setTitleText(target.value))}
          />
          {(emptyField && !titleText) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {(emptyField && !selectedUser)
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
