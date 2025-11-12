import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(user => user.id === todo.userId) as User;

    return { ...todo, user };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!selectedUserId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Fixed ID generation to handle empty todos array
    const maxId = todos.length > 0
      ? Math.max(...todos.map(todo => todo.id))
      : 0;
    const newId = maxId + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId)!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
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
