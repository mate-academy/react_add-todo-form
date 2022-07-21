import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer
    .find(user1 => userId === user1.id);

  return foundUser || null;
};

const preparedTodos = [...todosFromServer].map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);

  const addTodo = (newTitle: string, newUserId: number): void => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: newTitle,
      userId: newUserId,
      completed: false,
      user: getUser(newUserId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!todoTitle);
    setUserIdError(!todoUserId);

    if (!todoTitle || !todoUserId) {
      return;
    }

    addTodo(todoTitle, todoUserId);
    setTodoTitle('');
    setTodoUserId(0);
  };

  return (
    <div className="App">
      <h1 className="mainTitle">Add todo form</h1>

      <form
        onSubmit={onSubmit}
        className="form"
      >
        <div className="field">
          <input
            className="input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={event => {
              setTitleError(false);
              setTodoTitle(event.target.value
                .replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            className="select"
            data-cy="userSelect"
            value={todoUserId}
            onChange={event => {
              setUserIdError(false);
              setTodoUserId(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" className="select">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
