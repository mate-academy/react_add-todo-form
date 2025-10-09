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

  const todosWithUsers: Todo[] = initialTodos.map((rawTodo: RawTodo) => ({
    ...rawTodo,
    user: (users as User[]).find((user: User) => user.id === rawTodo.userId)!,
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

    const user = (users as User[]).find(
      (u: User) => u.id === Number(selectedUserId),
    )!;

    const nextId =
      (todos.length ? Math.max(...todos.map((todo: Todo) => todo.id)) : 0) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App box">
      <h1 className="title">Todos</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
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
            onChange={event => {
              const sanitizedValue = sanitizeTitle(event.target.value);

              setTitle(sanitizedValue);
              if (titleError && sanitizedValue.trim() !== '') {
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
              onChange={event => {
                const value = event.target.value;

                setSelectedUserId(value);
                if (userError && value) {
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
