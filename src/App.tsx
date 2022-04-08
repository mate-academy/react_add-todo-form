import React, { useState } from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoLits';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && title) {
      setTodos((currentState) => {
        const createTodo = {
          title,
          userId,
          id: currentState.length + 1,
          completed: false,
          user: users.find(user => user.id === userId)
            || null,
        };

        return [...currentState, createTodo];
      });
      setTitle('');
      setUserId(0);
    } else {
      setTitleError(!title);
      setUserIdError(!userId);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <select
          name="select"
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserIdError(false);
          }}
        >
          <option value="0">
            Choose name
          </option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        {userIdError && (
          'Choose name'
        )}
        <label htmlFor="titleId">
          <input
            type="text"
            placeholder="New task"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>
        {titleError && ('Enter title')}

        <button type="submit">Add</button>
      </form>
      <div>
        <TodoList todos={todos} />
      </div>
    </>
  );
};

export default App;
