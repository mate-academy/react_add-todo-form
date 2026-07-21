import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const prepareInitialTodos = (todos: typeof todosFromServer, users: User[]): Todo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(u => u.id === todo.userId),
  }));
};

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(() =>
    prepareInitialTodos(todosFromServer, usersFromServer),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, '');

    if (titleError) {
      setTitleError(false);
    }

    setTitle(cleanedValue);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = userId === 0;

    if (isTitleEmpty || isUserEmpty) {
      setTitleError(isTitleEmpty);
      setUserError(isUserEmpty);
      return;
    }

    const selectedUser = users.find(u => u.id === userId);
    const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Enter a title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">Choose a user</label>
          <select
            id="user"
            data-cy="userSelect"
            onChange={handleUserChange}
            value={userId}
            name="user"
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
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

      <TodoList todos={todos} />
    </div>
  );
};
