import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(() =>
    todosFromServer.map(todo => {
      const user = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user,
      };
    })
  );

  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    let isValid = true;

    if (!trimmedTitle) {
      setTitleError(true);
      isValid = false;
    }

    if (selectedUserId === 0) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const user = users.find(user => user.id === selectedUserId)!;

    

    const newTodo = {
      title: trimmedTitle,
      userId: selectedUserId,
      completed: false,
      user,
      id: maxId + 1,
    };

    console.log(newTodo)

    setTodos(current => [...current, newTodo]);

    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
