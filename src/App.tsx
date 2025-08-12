import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { User } from './types/user';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState([...todosFromServer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleValid = !!title.trim();
    const isUserValid = user !== 0;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    const selectedUser: User = usersFromServer.find(u => u.id === user)!;

    setTodos(prev => [
      ...prev,
      {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: user,
        user: selectedUser, // ✅ добавили объект пользователя
      },
    ]);

    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (hasTitleError) {
                  setHasTitleError(false);
                }
              }}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              onChange={e => {
                setUser(+e.target.value);
                if (hasUserError) {
                  setHasUserError(false);
                }
              }}
              value={user}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(el => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
