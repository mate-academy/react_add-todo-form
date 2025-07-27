import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [isNotUserSelected, setIsNotUserSelected] = useState(false);

  const [preparedTodos, setPreparedTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = (postTitle: string, userId: number, currentTodos: Todo[]) => {
    const newId: number = Math.max(...currentTodos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title: postTitle,
      userId: userId,
      completed: false,
    };

    setPreparedTodos(prevTodos => [...prevTodos, newTodo]);
    setHasTitleError(false);
    setIsNotUserSelected(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (selectedUser === 0) {
      setIsNotUserSelected(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    addTodo(title, selectedUser, preparedTodos);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setIsNotUserSelected(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isNotUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
