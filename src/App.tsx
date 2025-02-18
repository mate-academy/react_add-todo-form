import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

export const App = () => {
  const newTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user:
      usersFromServer.find(
        userFromServer => todo.userId === userFromServer.id,
      ) || null,
  }));
  const [todos, setTodos] = useState(newTodos);
  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [userTouched, setUserTouched] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length <= 0 && user === 0) {
      setTitleError(true);
      setTitleTouched(false);
      setUserError(true);
      setUserTouched(false);

      return;
    }

    if (title.length <= 0) {
      setTitleError(true);
      setTitleTouched(false);

      return;
    }

    if (user === 0) {
      setUserError(true);
      setUserTouched(false);

      return;
    }

    const todoId: number =
      [...todosFromServer].sort((a, b) => b.id - a.id)[0].id + 1;
    const newUser =
      usersFromServer.find(userFromServer => userFromServer.id === user) ||
      null;

    const newTodo: Todo = {
      id: todoId,
      title: title,
      completed: false,
      userId: newUser?.id || null,
      user: newUser || null,
    };

    setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);

    setTitle('');
    setUser(0);
    setTitleError(false);
    setTitleTouched(true);
    setUserError(false);
    setUserTouched(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleTouched(true);
            }}
          />

          {titleError && !titleTouched && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            name="user"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(+event.target.value);
              setUserTouched(true);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option value={userFromServer.id} key={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>

          {userError && !userTouched && (
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
