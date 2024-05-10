import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/Todo';
import { useState } from 'react';
import { User } from './types/User';

function getUserId(userId: number): User | null {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserId(todo.userId),
  };
});

function getNewId(todos: TodoWithUser[]) {
  const newId = Math.max(...todos.map(todo => todo.id));

  return newId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !userId) {
      setTitleError(!title.trim());
      setUserError(!userId);

      return;
    }

    const newTodo = {
      id: getNewId(todos),
      title: title.trim(),
      completed: false,
      userId: userId,
      user: getUserId(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>
          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userError && 'Please choose a user'}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
