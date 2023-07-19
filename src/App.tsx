import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
})) || null;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [todoText, setTodoText] = useState('');
  const [todoTextError, setTodoTextError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTodoText(newTitle);
    setTodoTextError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const maxId = Math.max(...todos.map(todo => todo.id));

  const reset = () => {
    setTodoText('');
    setUserId(0);
    setTodoTextError(false);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoText || !userId) {
      setTodoTextError(!todoText);
      setUserIdError(!userId);

      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: todoText,
      userId: +userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoText}
            onChange={handleTitleChange}
          />
          {
            todoTextError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            id="userId"
            defaultValue={0}
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {
            userIdError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
