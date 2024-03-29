import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types/types';
import { TodoList } from './components/TodoList';

const getMaxId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const reset = () => {
    setFormData({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });

    setHasUserIdError(false);
    setHasTitleError(false);
  };

  const handleAdd = ({ id, ...allData }: Todo) => {
    const newTodo = {
      id: getMaxId(todos),
      ...allData,
      userId: +allData.userId,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setHasTitleError(!value);
    setFormData(currentUser => ({ ...currentUser, [name]: value }));
  };

  const handleSetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setHasUserIdError(+value === 0);
    setFormData(currentUser => ({ ...currentUser, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!formData.title);
    setHasUserIdError(+formData.userId === 0);

    if (!formData.title || +formData.userId === 0) {
      return;
    }

    handleAdd(formData);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            placeholder="Enter the todo Title"
            type="text"
            name="title"
            data-cy="titleInput"
            value={formData.title}
            onChange={e => handleSetInput(e)}
            onBlur={e => handleSetInput(e)}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userId"
            data-cy="userSelect"
            value={+formData.userId}
            onChange={e => handleSetSelect(e)}
            onBlur={e => handleSetSelect(e)}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
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
