import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
// import { User } from './types/User';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;

    // Remove non-letter/number/space characters
    const cleanedTitle = title
      .replace(/[^a-zA-Zа-яА-Я0-9іІїЇєЄґҐ\s]/g, '')
      .trim();

    if (!cleanedTitle) {
      setTitleError('Please enter a title');
      valid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const user = usersFromServer.find(u => u.id === Number(userId));

    const newTodo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: cleanedTitle,
      userId: Number(userId),
      completed: false,
      user: {
        id: user!.id,
        name: user!.name,
        username: user!.username,
        email: user!.email,
      },
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            name="title"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="user"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError('');
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
