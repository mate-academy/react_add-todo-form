import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/TODO';

const idForNewTodo = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodoState = {
  id: idForNewTodo,
  title: '',
  completed: false,
  userId: 0,
};

const isHasError = {
  title: false,
  userId: false,
};

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState(initialTodoState);
  const [todos, setTodos] = useState(todosFromServer);
  const [initialError, setinitialError] = useState(isHasError);

  const handleInputChange = (key: string, value: string | number) => {
    setNewTodo(prev => ({ ...prev, [key]: value }));
    setinitialError(prev => ({ ...prev, [key]: false }));
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const reset = () => {
    setNewTodo(initialTodoState);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setinitialError((prevValue) => ({ ...prevValue, title: true }));
    }

    if (!newTodo.userId) {
      setinitialError((prevValue) => ({ ...prevValue, userId: true }));
    }

    if (!newTodo.title.trim() || !newTodo.userId) {
      return;
    }

    addTodo(newTodo);
    setinitialError((prevValue) => ({ ...prevValue, title: false }));
    setinitialError((prevValue) => ({ ...prevValue, userId: false }));

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
              onChange={(event) => handleInputChange(
                'title', event.target.value,
              )}
            />
          </label>
          {initialError.title
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={newTodo.userId}
            data-cy="userSelect"
            onChange={(event) => handleInputChange(
              'userId', +event.target.value,
            )}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {initialError.userId
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
