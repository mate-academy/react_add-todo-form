import './App.scss';

import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { getNewId, getTodosWithUsers } from './helpers';
import { Todo } from './types/types';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const todosWithUsers = getTodosWithUsers(todos, usersFromServer);

  const addTodo = (
    title: string,
    userId: number,
  ) => {
    const newTodo: Todo = {
      id: getNewId(todos),
      title,
      completed: false,
      userId,
    };

    setTodos(currentTodos => [
      ...currentTodos,
      newTodo,
    ]);
  };

  const clearForm = () => {
    setTodoTitle('');
    setSelectedUserId(0);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId && todoTitle) {
      addTodo(todoTitle, selectedUserId);
      clearForm();
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label htmlFor="Title">Title: </label>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
          />
          {submitted && !todoTitle
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="User">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => setSelectedUserId(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>
          {submitted && !selectedUserId
          && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />

    </div>
  );
};
