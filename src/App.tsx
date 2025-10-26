import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';


export const preparedTodos = todosFromServer.map(todo => {
  const selectedUser  = usersFromServer.find(user => user.id === todo.userId) || null;

  return {
    ...todo,
    user: selectedUser,
  };
});

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

    const selectedUser  = usersFromServer.find(user => user.id === Number(userId));
    const maxId = Math.max(...todos.map(t => t.id)) + 1;

    const newTodo = {
      id: maxId,
      title,
      userId: Number(userId),
      completed: false,
      user: selectedUser  || null,
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
              onChange={event => {
                const cleaned = cleanTitle(event.target.value);

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
              onChange={event => {
                setUserId(event.target.value);
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
      <TodoList list={todos} />
    </div>
  );
};
