import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser, User } from './types/types';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState<number>(0);
  const [userError, setUserError] = useState<boolean>(false);

  const todosWithUsers: TodoWithUser[] = todos.map(todo => {
    const user = users.find(person => person.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const selectedUser = users.find(user => user.id === userId);
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleInputChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={handleSelect}>
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
