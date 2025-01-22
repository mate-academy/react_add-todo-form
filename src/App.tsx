import React, { useState } from 'react';
import users from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initiaTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initiaTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');
  // const [error, setError] = useState('');

  // const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // useEffect(() => {
  //   const allFieldsFilled = title.trim() && userId !== 0;

  //   setIsSubmitDisabled(!allFieldsFilled);
  // }, [title, userId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    } else {
      setUserIdError('');
    }

    if (!title || userId === 0) {
      return;
    }

    const user = getUser(userId);

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
            // error={titleError}
            placeholder="Please enter a title"
          />
          {titleError && !title && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">{userIdError}</span>}
          {/* <span className="error">Please choose a user</span> */}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          // disabled={isSubmitDisabled}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
