import React, { useEffect, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(
    user => user.id === userId,
  );

  return foundUser || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleEntered, setEnteredTitle] = useState(false);
  const [isUserSelected, setSelectedUser] = useState(false);

  useEffect(() => {
    const initialTodos = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(initialTodos);
  }, []);

  function addTodo(newTitle: string, newUserId: number): void {
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      title: newTitle,
      userId: newUserId,
      completed: false,
      id: maxId + 1,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setEnteredTitle(!title);
    setSelectedUser(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo(title, userId);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setEnteredTitle(false);
            }}
          />
          { isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setSelectedUser(false);
            }}
          >
            <option value="0" selected disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserSelected && (
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
