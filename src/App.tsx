import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const findUserById = (id: number): User => {
  return usersFromServer.filter(user => user.id === id)[0];
};

const initialTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(initialTodos);

  const [emptyTitle, setEmptyTitle] = useState(false);
  const [isSelectedUser, setIsSelectedUser] = useState(false);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (titleTodo === '') {
      setEmptyTitle(true);
    }

    if (selectedUser === 0) {
      setIsSelectedUser(true);
    }

    if (selectedUser === 0 || titleTodo === '') {
      return;
    }

    const todo: Todo = {
      id: todos.length > 0
        ? (todos.sort((t1, t2) => t2.id - t1.id)[0].id) + 1
        : 0,
      completed: false,
      title: titleTodo,
      user: findUserById(selectedUser),
    };

    setTodos(prevTodos => [...prevTodos, todo]);

    setTitleTodo('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleTodo}
            placeholder="Enter a title"
            onChange={event => {
              setEmptyTitle(false);
              setTitleTodo(event.target.value);
            }}
          />

          {emptyTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setIsSelectedUser(false);
            }}
          >
            <option
              value="0"
              disabled
              selected={selectedUser === 0}
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {isSelectedUser && (
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
