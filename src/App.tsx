import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const transformedTodos = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState(transformedTodos);

  const [titleText, setTitleText] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleText.trim() === '') {
      setTitleError(true);
    }

    if (selectedUserId === '') {
      setUserError(true);
    }

    if (titleText.trim() === '' || selectedUserId === '') {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: titleText,
      completed: false,
      userId: Number(selectedUserId),
      user: usersFromServer.find(user => user.id === Number(selectedUserId))!,
    };

    setTodos([...todos, newTodo]);
    setTitleText('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id='titleInput'
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={titleText}
            onChange={event => {
              setTitleText(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id='userSelect'
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setUserError(false);
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
