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

  const [titleText,setTitleText] = useState('');
  const [selectedUserId,setSelectedUserId] = useState(0);
  const [titleError,setTitleError] = useState(false);
  const [userError,setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleText.trim() === '') {
      setTitleError(true);
    }

    if (selectedUserId === 0) {
      setUserError(true);
    }

    if (titleText.trim() === '' || selectedUserId === 0) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: titleText,
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(u => u.id === selectedUserId)!,
    };

    setTodos([...todos, newTodo]);
    setTitleText('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form  onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={titleText}
            onChange={(e) => {
              setTitleText(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(e) => {
              setSelectedUserId(Number(e.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
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
