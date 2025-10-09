import { useState } from 'react';
import { TodoList } from './components/TodoList';
import users from './api/users';
import initialTodos from './api/todos';
import './App.scss';

const sanitizeTitle = (value: string) =>
  value.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ0-9 ]+/g, '');

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

export const App = () => {
  type RawTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todosWithUsers: Todo[] = initialTodos.map((t: RawTodo) => ({
  ...t,
  user: (users as User[]).find(u => u.id === t.userId)!,
}));

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = () => {
    const isTitleEmpty = title.trim() === '';
    const isUserEmpty = !selectedUserId;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const user = (users as User[]).find(u => u.id === +selectedUserId)!;
    const nextId = (todos.length ? Math.max(...todos.map(t => t.id)) : 0) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App box">
      <h1 className="title">Todos</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <div className="field">
          <label className="label" htmlFor="titleInput">
            Title
          </label>
          <input
            id="titleInput"
            data-cy="titleInput"
            type="text"
            className={`input${titleError ? ' is-danger' : ''}`}
            placeholder="Enter a todo title"
            value={title}
            onChange={e => {
              const sanitized = sanitizeTitle(e.target.value);

              setTitle(sanitized);
              if (titleError && sanitized.trim() !== '') {
                setTitleError(false);
              }
            }}
          />

          {titleError && <p className="error">Please enter a title</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="userSelect">
            User
          </label>
          <div
            className={`select is-fullwidth${userError ? ' is-danger' : ''}`}
          >
            <select
              id="userSelect"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={e => {
                const v = e.target.value;

                setSelectedUserId(v);
                if (userError && v) {
                  setUserError(false);
                }
              }}
            >
              <option value="">Choose a user</option>
              {(users as User[]).map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {userError && <p className="error">Please choose a user</p>}
        </div>

        <button type="submit" className="button is-link" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
