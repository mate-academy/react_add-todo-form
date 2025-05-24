import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormEvent, useState } from 'react';
import { Todo } from './components/Interfaces';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [userFieldHasError, setUserFieldHasError] = useState(false);
  const [titleFieldHasError, setTitleFieldHasError] = useState(false);

  const [users] = useState(usersFromServer);

  const handleAddNewTodo = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!title || userId === 0) {
      setTitleFieldHasError(!title);
      setUserFieldHasError(!userId);

      return;
    }

    const author = users.find(user => user.id === userId);

    if (!author) {
      return;
    }

    const maxId = Math.max(0, ...todos.map(t => t.id)) + 1;

    const newTodo: Todo = {
      id: maxId,
      title: title,
      completed: false,
      userId: author.id,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddNewTodo}>
        <div className="field">
          <input
            placeholder="Title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={e => {
              setTitle(e.target.value);
              setTitleFieldHasError(false);
            }}
          />
          {titleFieldHasError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(+e.target.value);
              setUserFieldHasError(false);
            }}
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

          {userFieldHasError && (
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
