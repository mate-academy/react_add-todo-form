import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const emtyTitle = title.trim();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const newId = Math.max(...todos.map((el) => el.id));

  const newTodo = {
    title,
    userId,
    completed: false,
    user: getUserById(userId),
    id: newId + 1,
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !emtyTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!userId || !title || !emtyTitle) {
      return;
    }

    setTodoList(currentTodo => [...currentTodo, newTodo]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label className="field" htmlFor="title">
          {'Title: '}
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </label>

        <div className="field">
          <label htmlFor="user-id">
            {'User: '}
          </label>
          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(el => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>

          {userIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
