import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userById: number) {
  return usersFromServer.find(user => user.id === userById)
      || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserId, setHasUserId] = useState(false);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserId(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title || title.trim().length === 0);
    setHasUserId(!userId);

    if (title.trim().length > 0 && userId > 0) {
      const newTodo = {
        id: Math.random(),
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      addTodo(newTodo);

      setTitle('');
      setUserId(0);
      setHasTitleError(false);
      setHasUserId(false);
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
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>
          {hasUserId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
