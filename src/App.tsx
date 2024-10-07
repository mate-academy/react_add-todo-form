import { Todo } from './interfaces/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(client => client.id === todo.userId)!;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(initialTodos);

  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState(false);

  const addTodo = () => {
    setVisibleTodos(current => {
      const id = Math.max(...current.map(item => item.id));
      const user = usersFromServer.find(person => person.id === selectedUser);

      if (!user) {
        return current;
      }

      const newTodo = {
        id: id + 1,
        title,
        completed: false,
        userId: user?.id,
        user,
      };

      return [...current, newTodo];
    });
  };

  const handleReset = () => {
    setTitle('');
    setSelectedUser(0);

    setSelectedUserError(false);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setSelectedUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    addTodo();
    handleReset();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    if (selectedUserError) {
      setSelectedUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInput}
            placeholder="Enter a title"
            id="title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={selectedUser}
            id="user"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
