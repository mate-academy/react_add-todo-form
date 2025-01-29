import './App.scss';
import { TodoList } from './components/TodoList';
import { ToDo } from './components/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoItems, setTodoItems] = useState<ToDo[]>(todos);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addTodo = (todo: ToDo) => {
    setTodoItems(current => [...current, todo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(newTitle);

    if (newTitle.trim()) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = +event.target.value;

    setUserId(newUserId);

    if (newUserId !== 0) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const titleError = !trimmedTitle;
    const userError = userId === 0;

    setHasTitleError(titleError);
    setHasUserError(userError);

    if (titleError || userError) {
      return;
    }

    const selectedUser = getUserById(userId);

    if (selectedUser) {
      const newId = Math.max(...todoItems.map(todo => todo.id)) + 1;

      const newTodo: ToDo = {
        id: newId,
        title: trimmedTitle,
        completed: false,
        user: selectedUser,
        userId: selectedUser.id,
      };

      addTodo(newTodo);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoItems} />
    </div>
  );
};
