import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/user';

export const App = () => {
  const [select, setSelect] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTittleError] = useState(false);

  const [todos, setTodos] = useState([...todosFromServer]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
  ) => {
    switch (field) {
      case 'input':
        setTitle(event.target.value);
        setHasTittleError(false);
        break;

      case 'select':
        setSelect(+event.target.value);
        setHasSelectError(false);
        break;

      default:
        throw new Error('Some problem!');
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTittleError(!title);
    setHasSelectError(!select);

    if (!title || !select) {
      return;
    }

    const maxId = todos.reduce(
      (max, obj) => (obj.id > max ? obj.id : max),
      todos[0].id,
    );

    const todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: select,
    };

    setTodos([...todos, todo]);

    setTitle('');
    setSelect(0);
    setHasSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}
      >
        <div className="field">
          <label htmlFor="input">Title</label>
          <input
            id="input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => onChange(event, 'input')}
            onBlur={() => setTitle(title.trim())}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={select}
            onChange={event => onChange(event, 'select')}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError && (
            <span className="error">Please choose a user</span>
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
