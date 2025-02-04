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
  const [submit, setSubmit] = useState(false);
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId === 0) {
      return;
    }

    const newTodo: NewTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setUserId(0);
    setTitle('');
    setSubmit(false);
    setTodos([...todos, newTodo]);
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
            onChange={event => setTitle(event.target.value)}
            placeholder="enter todo title"
            required
          />
          {title === '' && submit === true && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
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
          {userId === 0 && submit === true && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            setSubmit(true);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
