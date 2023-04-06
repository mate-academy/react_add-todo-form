import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { UserList } from './components/UserList/UserList';

function findUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const getNewId = (allTodos: Todo[]) => {
  const todoId = allTodos.map(todo => todo.id);

  return Math.max(...todoId) + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [newTodos, addNewTodos] = useState(todos);
  const [isError, setError] = useState(false);
  const [selectedUserId, setUserId] = useState(0);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && selectedUserId) {
      const todo = {
        id: getNewId(newTodos),
        title,
        userId: selectedUserId,
        completed: false,
        user: findUserById(selectedUserId),
      };

      addNewTodos([...newTodos, todo]);
      setUserId(0);
      setTitle('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value.trimStart());
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a tittle"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          {isError
            && !title
            && (
              <span className="error">Please enter a title</span>
            )}

        </div>

        <div className="field">
          <label htmlFor="">
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => setUserId(+(event.target.value))}
            >

              <UserList users={usersFromServer} />
            </select>
          </label>
          {isError && !selectedUserId
            && (
              <span className="error">Please choose a user</span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
