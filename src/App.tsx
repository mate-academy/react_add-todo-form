import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/Types/Types';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  const foundUser = usersFromServer.find(u => u.id === todo.userId);

  return {
    ...todo,
    user: foundUser,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectUser, setSelectUser] = useState(0);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+e.target.value);
    setSelectUserError(false);
  };

  const handleOnAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError(!title);
    setSelectUserError(!selectUser);

    let goodTodo = true;

    if (!title.trim()) {
      setTitleError(true);
      goodTodo = false;
    }

    if (selectUser === 0) {
      setSelectUserError(true);
      goodTodo = false;
    }

    if (!goodTodo) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(a => a.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      user: usersFromServer.find(user => user.id === selectUser),
      userId: selectUser,
    };

    setTodos(p => [...p, newTodo]);
    setTitle('');
    setSelectUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnAdd}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="selectField"
            value={selectUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectUserError && (
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
