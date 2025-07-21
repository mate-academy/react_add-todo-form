import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(trimmedTitle === '');
    setHasUserError(userId === 0);

    if (trimmedTitle && userId) {
      const maxId = Math.max(...todos.map(todo => todo.id), 0);
      const newTodo = {
        id: maxId + 1,
        title: trimmedTitle,
        completed: false,
        userId,
        user: usersFromServer.find(user => user.id === userId),
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter title"
            onChange={e => {
              setTitle(e.target.value);
              if (e.target.value.trim()) {
                setHasTitleError(false);
              }
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(+e.target.value);
              if (+e.target.value !== 0) {
                setHasUserError(false);
              }
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

          {hasUserError && <span className="error">Please choose a user</span>}
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
