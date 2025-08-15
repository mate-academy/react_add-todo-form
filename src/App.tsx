import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) as User,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoUser, setNewTodoUser] = useState<string>('');
  const [newTodoUserError, setNewTodoUserError] = useState<string>('');
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoTitleError, setNewTodoTitleError] = useState<string>('');
  function handleChangeNewTodoUser(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setNewTodoUserError('');
    setNewTodoUser(event.target.value);
  }

  function handleChangeNewTodoTitle(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setNewTodoTitleError('');
    setNewTodoTitle(event.target.value);
  }

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function findMaxTodoId() {
    return Math.max(...todos.map(todo => todo.id));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newTodoTitle) {
      setNewTodoTitleError('Please enter a title');
    }

    if (!newTodoUser) {
      setNewTodoUserError('Please choose a user');
    }

    if (!newTodoTitle || !newTodoUser) {
      return;
    }

    addTodo({
      id: +findMaxTodoId() + 1,
      title: newTodoTitle,
      completed: false,
      userId: +newTodoUser,
      user: getUserById(+newTodoUser)!,
    });

    setNewTodoTitle('');
    setNewTodoUser('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={newTodoTitle}
            onChange={handleChangeNewTodoTitle}
          />
          {newTodoTitleError && (
            <span className="error">{newTodoTitleError}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newTodoUser}
            onChange={handleChangeNewTodoUser}
          >
            <option value="" disabled>
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
          {newTodoUserError && (
            <span className="error">{newTodoUserError}</span>
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
