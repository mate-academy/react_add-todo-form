import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TODO } from './types/TODO';

const idForNewTodo = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const initialTodoState = {
    id: idForNewTodo,
    title: '',
    completed: false,
    userId: 0,
  };

  const initialTodos = [...todosFromServer];

  const [newTodo, setNewTodo] = useState(initialTodoState);
  const [todos, setTodos] = useState(initialTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prevValue) => ({ ...prevValue, title: event.target.value }));
    setHasTitleError(false);
  };

  const handleUserChange
= (event: React.ChangeEvent<HTMLSelectElement>) => {
  setNewTodo((prevValue) => ({ ...prevValue, userId: +event.target.value }));
  setHasUserIdError(false);
};

  function addTodo(todo: TODO) {
    setTodos([...initialTodos, todo]);
  }

  const reset = () => {
    setNewTodo({
      id: idForNewTodo,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setHasTitleError(true);
    }

    if (!newTodo.userId) {
      setHasUserIdError(true);
    }

    if (!newTodo.title.trim() || !newTodo.userId) {
      return;
    }

    addTodo(newTodo);
    setHasTitleError(false);
    setHasUserIdError(false);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="">
            Title
            <input
              value={newTodo.title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a todo"
              onChange={handleOnChange}

            />
          </label>
          {hasTitleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={newTodo.userId}
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user =>
              <option value={user.id} key={user.id}>{user.name}</option>)}
          </select>
          {
            hasUserIdError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
