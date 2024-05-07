import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { TodosProps } from './types/Todo';
import todosFromServer from './api/todos';
import { getUserById } from './services/services';

const initialTodos: TodosProps[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [finalTodos, setFinalTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedError, setSelectedError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  }

  const handleOnChangeUser = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedError(false);
  };

  const addTodo = (newTodo: TodosProps) => {
    setFinalTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setSelectedError(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title || !title.trim());
    setSelectedError(!selectedUserId);

    if (!title || !title.trim() || !selectedUserId) {
      return;
    }

    addTodo({
      title,
      completed: false,
      user: getUserById(selectedUserId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={event => handleSubmitForm(event)}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={() => handleOnChangeUser}
            defaultValue="0"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={finalTodos} />
      </section>
    </div>
  );
};
