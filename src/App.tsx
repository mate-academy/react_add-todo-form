import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './interfaces';

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [initialTodo, setInitialTodo] = useState<Todo[]>(visibleTodos);

  const [title, setTitle] = useState('');
  const [hasTitleErors, setHasTitleErors] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectedUserErors, setHasSelectedUserErors] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleErors(title === '');
    setHasSelectedUserErors(selectedUser === 0);

    if (title === '' || selectedUser === 0) {
      return;
    }

    const newTodo = {
      id: Math.max(0, ...initialTodo.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser),
    };

    setInitialTodo([...initialTodo, newTodo]);

    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleErors(false);
            }}
          />
          {hasTitleErors && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setHasSelectedUserErors(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasSelectedUserErors && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={initialTodo} />
    </div>
  );
};
