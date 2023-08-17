import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { ToDo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(id: number) {
  return usersFromServer.find(usr => (id) === usr.id) || null;
}

export const App = () => {
  const initTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [todos, setTodos] = useState<ToDo[]>(initTodos);
  const [todo, setTodo] = useState<ToDo>(
    {
      id: 0,
      title: '',
      completed: false,
      userId: 0,
      user: null,
    },
  );

  const [isFilled, setIsFilled] = useState(true);

  const onAdd = (newTodo: ToDo) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...newTodo,
        id: Math.max(...(todosFromServer.map(toDo => toDo.id))) + 1,
      },
    ]);
  };

  const resetForm = () => {
    setTodo(
      {
        id: 0,
        title: '',
        completed: false,
        userId: 0,
        user: null,
      },
    );

    setIsFilled(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(
      { ...todo, title: event.target.value },
    );
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodo(
      {
        ...todo,
        userId: +event.target.value,
        user: getUser(+event.target.value),
      },
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title || !todo.userId) {
      setIsFilled(false);

      return;
    }

    onAdd(todo);

    resetForm();
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
          <label htmlFor="title">
            Title:
            <input
              type="text"
              value={todo.title}
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
            {(!todo.title.trim() && !isFilled)
              && (<span className="error">Please enter a title</span>)}
          </label>
        </div>

        <div className="field">
          <label htmlFor="select">
            User:
            <select
              name="select"
              data-cy="userSelect"
              onChange={handleUserIdChange}
              value={todo.userId}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(usr => (
                <option
                  value={usr.id}
                  key={usr.id}
                >
                  {usr.name}
                </option>
              ))}
            </select>

            {(!todo.userId && !isFilled)
              && (<span className="error">Please choose a user</span>)}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList
        todos={todos}
      />
    </div>
  );
};
