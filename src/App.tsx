import { useState } from 'react';
import './App.scss';
// import cn from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TasksWithTodo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const tasksWithTodo: TasksWithTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [todos, setTodos] = useState(tasksWithTodo);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const getTodoId = tasksWithTodo.map(todo => todo.id);
  const getId = Math.max(...getTodoId) + 1;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle);

    if (newTitle) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUser = +event.target.value;

    setCurrentUserId(newUser);

    if (newUser !== 0) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    } else {
      setHasTitleError(false);
    }

    if (!currentUserId) {
      setHasUserError(true);
    } else {
      setHasUserError(false);
    }

    const newTodo: TasksWithTodo = {
      id: getId,
      title,
      userId: currentUserId,
      user: getUserById(currentUserId),
      completed: false,
    };

    if (title && currentUserId) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      setTitle('');
      setCurrentUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            value={currentUserId}
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(el => (
              <option
                key={el.id}
                value={el.id}
              >
                {el.name}
              </option>
            ))}
          </select>
          {hasUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
