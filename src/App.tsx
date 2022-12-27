import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import type { User } from './types/User';
import type { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [todosList, setTodosList] = useState(todos);

  const clearForm = () => {
    setTitle('');
    setUserId(0);

    setIsTitle(false);
    setIsUser(false);
  };

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUser(false);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitle(!title);
    setIsUser(!(+userId));

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: todos.sort((a, b) => b.id - a.id)[0].id + 1,
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    setTodosList((prevTodos) => (
      [...prevTodos, newTodo]
    ));

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={addTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={changeTitle}
            placeholder="Title"
          />
          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={selectUser}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
