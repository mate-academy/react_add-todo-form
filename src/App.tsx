import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo} from './types';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map((serverTodo) => {
    const foundUser = usersFromServer.find((user) => user.id === serverTodo.userId)!;
    return { ...serverTodo, user: foundUser, userId: foundUser.id };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) return;

    const selectedUser = usersFromServer.find((user) => user.id === Number(selectedUserId))!;

    const newTodo: Todo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title,
      completed: false,
      user: selectedUser,
      userId: selectedUser.id, // важливо додати userId
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError) setTitleError('');
              }}
            />
          </label>
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label>
            User
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(event.target.value);
                if (userError) setUserError('');
              }}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={String(user.id)}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
