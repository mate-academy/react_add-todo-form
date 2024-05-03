import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

function findUser(userId: number): User | null {
  const foundUser = usersFromServer.find(userItem => userItem.id === userId);

  return foundUser || null;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);
  const [todoInfo, setTodoInfo] = useState({
    id: 0,
    title: '',
    userId: 0,
    user: null,
  });

  const { title } = todoInfo;

  const listUser = usersFromServer;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoInfo.title.trim() || todoInfo.userId === 0) {
      if (!todoInfo.title.trim()) {
        setTitleError(true);
      }

      if (todoInfo.userId === 0) {
        setUserIdError(true);
      }

      return;
    }

    setTitleError(false);
    setUserIdError(false);

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: todoInfo.title,
      completed: false,
      userId: todoInfo.userId,
      user: findUser(todoInfo.userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTodoInfo({
      ...todoInfo,
      title: '',
      userId: 0,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInfo(prevTodoInfo => ({
      ...prevTodoInfo,
      title: event.target.value,
    }));

    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value);

    setTodoInfo(prevTodoInfo => ({
      ...prevTodoInfo,
      userId: selectedUserId,
    }));

    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
            value={title}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={todoInfo.userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {listUser.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
