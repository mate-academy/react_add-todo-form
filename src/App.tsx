import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function cleanTitle(value) {
    return value.replace(/[^a-zA-Zа-щА-ЩЬьЮюЯяІіЇїЄєҐґ0-9\s]/g, '');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();



    const newTodo = {
      id: todos.length + 1,
      title,
      userId: Number(userId),
      completed: false,
    };

    if (title && userId) {
      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUserId('');
      setTitleError('');
      setUserError('');
    } else {
      if (!title) {
        setTitleError('Please enter a title');
      }

      if (!userId) {
        setUserError('Please choose a user');
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={e => {
                const cleaned = cleanTitle(e.target.value);

                setTitle(cleaned);
                setTitleError('');
              }}
              placeholder="Enter a title"
            />
          </label>
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => {
                setUserId(e.target.value);
                setUserError('');
              }}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList list={todos} getUserById={getUserById} />
    </div>
  );
};
