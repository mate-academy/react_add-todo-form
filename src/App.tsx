import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId)!,
    })),
  );
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function handleReset() {
    setSelectedUserId('0');
    setTitle('');
    setIsSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (selectedUserId === '0') {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    const user = usersFromServer.find(u => u.id === Number(selectedUserId));

    if (!user) {
      return;
    }

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: Number(selectedUserId),
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    handleReset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Todo title </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);

              if (titleError) {
                setTitleError('');
              }
            }}
            placeholder="Enter todo title"
            required
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Assign to user </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);

              if (userError) {
                setUserError('');
              }
            }}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todos} />
    </div>
  );
};
