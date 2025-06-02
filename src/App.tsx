import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { TodoWithUser } from './entities/TodoWithUser';

import { getUserById } from './services/getUserById';
import { getTodoID } from './services/getTodoId';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [usedTodos, setUsedTodos] = useState<TodoWithUser[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const addTodo = (todo: TodoWithUser) => {
    const newTodo = {
      ...todo,
      id: getTodoID(usedTodos),
    };

    setUsedTodos(current => [...current, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = !!title.trim();
    const isUserValid = userId !== 0;

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoID(usedTodos),
      title: title.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    addTodo(newTodo);
    reset();
  };

  return (
    <div className="App">
      <h1 className="App__title">Static list of todos</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title:&nbsp;</label>
          <input
            type="text"
            id="todo-title"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (titleError) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User:&nbsp;</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              if (userError) {
                setUserError(false);
              }
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={usedTodos} />
    </div>
  );
};
