import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './components/types/types';

const todoList: Todo[] = todosFromServer.map(todo => {
  const usersTodo = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: usersTodo,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todoList);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+e.target.value);
    setHasUserError(false);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectedUser);

    if (title && selectedUser) {
      const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
      const newId = maxId + 1;
      const newUser = usersFromServer.find(user => user.id === selectedUser);

      if (newUser) {
        const newTodo: Todo = {
          id: newId,
          title: title,
          userId: selectedUser,
          completed: false,
          user: newUser,
        };

        setTodos([...todos, newTodo]);
        setTitle('');
        setSelectedUser(0);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={e => handleOnSubmit(e)}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectField">User: </label>
          <select
            data-cy="userSelect"
            id="selectField"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
