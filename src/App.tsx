import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { NewTodo } from './types/NewTodo';

export const App = () => {
  function findUserById(userById: number): User | undefined {
    return usersFromServer.find(user => userById === user.id);
  }

  const todosWithUsers: NewTodo[] = todosFromServer.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
  const users: User[] = [...usersFromServer];
  const [todos, setTodos] = useState<Todo[]>([...todosWithUsers]);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [submit, setSubmit] = useState(true);
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId === 0 || !title.trim()) {
      setSubmit(true);

      return;
    }

    const newTodo: NewTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setSubmit(false);
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
            placeholder="Please enter a title"
            onChange={event => setTitle(event.target.value)}
            onBlur={() => setSubmit(true)}
            required
          />
          {submit && title.trim() === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
            onBlur={() => setSubmit(true)}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {submit && userId === 0 && (
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
