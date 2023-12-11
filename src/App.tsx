import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { UserId } from './types/User';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<UserId>(0);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [crntTodoId, setCrntTodoId] = useState<number>(
    todosFromServer
      .reduce((a, item) => ((item.id > a) ? item.id : a), 0),
  );
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectError(false);
  };

  const handleSabmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!selectedUserId);

    if (!title
      || !selectedUserId) {
      return;
    }

    setCrntTodoId(p => p + 1);
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: crntTodoId + 1,
        title,
        completed: false,
        userId: selectedUserId,
      }]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSabmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter title"
            onChange={handleTitle}
          />

          {hasTitleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasSelectError
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
