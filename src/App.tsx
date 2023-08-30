import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/todo';

const newId = (list: Todo[]) => {
  const maxId = Math.max(...list.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState('0');
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setInvalidTitle(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(event.target.value);
    setInvalidUser(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setInvalidTitle(true);
    }

    if (currentUserId === '0') {
      setInvalidUser(true);
    }

    if (!title.trim() || currentUserId === '0') {
      return;
    }

    const newTodo: Todo = {
      id: newId(todoList),
      title,
      completed: false,
      userId: +currentUserId,
    };

    setTodoList(currentList => [...currentList, newTodo]);

    setCurrentUserId('0');
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={onTitleChange}
              placeholder="Enter a title"
            />
          </label>
          {invalidTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={currentUserId}
              onChange={onUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}

            </select>
          </label>

          {invalidUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
