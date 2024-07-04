import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo.model';
import { combineTodos } from './utils/helpers';
import { useForm } from './hooks/useForm';

export const App = () => {
  const combinedTodos = combineTodos(todosFromServer, usersFromServer);

  const [todos, setTodos] = useState<Todo[]>(combinedTodos);

  const largestTodoId = Math.max(...todos.map(todo => todo.id));

  const onAdd = (todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  };

  const { formValues, formErrors, onChange, onSubmit } = useForm({
    onFormSubmit: onAdd,
    id: largestTodoId,
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              data-cy="titleInput"
              onChange={onChange}
              value={formValues.title}
            />
          </label>

          {formErrors.title && (
            <span className="error">{formErrors.title}</span>
          )}
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              name="userId"
              data-cy="userSelect"
              value={formValues.userId}
              onChange={onChange}
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
          </label>

          {formErrors.userId && (
            <span className="error">{formErrors.userId}</span>
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
