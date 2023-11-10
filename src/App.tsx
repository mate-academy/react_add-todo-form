import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  // #region constant
  const [count, setCount] = useState(todosFromServer.length);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const initialFormForTodo = {
    id: count,
    title: '',
    completed: false,
    userId: 0,
  };
  const [form, setForm] = useState(initialFormForTodo);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  // #endregion

  // #region function
  function getNewTodoId(tds: Todo[]) {
    return Math.max(...tds.map(todo => todo.id)) + 1;
  }

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleChange = (value: string | number, field: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value,
    }));

    switch (field) {
      case 'title':
        setHasTitleError(false);
        break;
      case 'userId':
        setHasUserError(false);
        break;
      default:
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!form.title);
    setHasUserError(!form.userId);
    if (!form.title || !form.userId) {
      return;
    }

    addTodo(form);
    setForm(initialFormForTodo);
    setCount(count + 1);
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label
            className="label"
            htmlFor="todoTitle"
          >
            Title:
          </label>
          <input
            id="todoTitle"
            type="text"
            data-cy="titleInput"
            value={form.title}
            onChange={event => handleChange(event.target.value, 'title')}
            placeholder="Enter a title"
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label
            className="label"
            htmlFor="todoUser"
          >
            User:
          </label>
          <select
            id="todoUser"
            data-cy="userSelect"
            value={form.userId}
            onChange={event => handleChange(+event.target.value, 'userId')}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
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
