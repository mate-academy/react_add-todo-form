import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Task } from './services/types';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => {
    const todoUser = usersFromServer.find(user => user.id === todo.userId) || {
      id: 0,
      name: 'Unknown User',
      username: 'unknown',
      email: 'unknown@example.com',
    };

    return { ...todo, user: todoUser };
  });

  const [todoList, setTodoList] = useState<Task[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [titleHasIssue, setTitleHasIssue] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdHasIssue, setUserIdHasIssue] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleHasIssue(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserIdHasIssue(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleHasIssue(!title);
    setUserIdHasIssue(!userId);

    if (!title || !userId) {
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: Math.max(...todoList.map(task => task.id)) + 1,
        title: title,
        userId: userId,
        completed: false,
        user: usersFromServer.find(user => user.id === userId) || {
          id: 0,
          name: 'Unknown User',
          username: 'unknown',
          email: 'unknown@example.com',
        },
      },
    ]);

    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleChange(event)}
            placeholder="Enter title"
          />
          {titleHasIssue && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserIdChange(event)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdHasIssue && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
