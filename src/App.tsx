import React, { useState } from 'react';
import './App.scss';

import { users } from './api/users';
import { todosFromServer } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/index';

const preparedTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const regExp = new RegExp(/[^a-zA-Zа-яА-яіІ ]/g);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newUser = users.find(user => user.name === selectUser);

    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo: Todo = {
      id: todos[todos.length - 1].id + 1,
      title: todoTitle,
      userId,
      completed: false,
      user: newUser,
    };

    setIsTitle(!todoTitle);
    setIsUser(!selectUser);

    if (!todoTitle || !selectUser) {
      return;
    }

    setTodoTitle('');
    setSelectUser('');
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="app">
      <h1 className="app__title">ADD TODO FORM</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__enter">
          <input
            type="text"
            className="form__enter-input input"
            data-cy="titleInput"
            placeholder="Title"
            value={todoTitle}
            onChange={event => {
              setTodoTitle(event.target.value
                .replace(regExp, ''));
              setIsTitle(false);
            }}
          />
          {isTitle && (
            <span className="form__error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="form__select select">
          <select
            name="usres"
            id="users"
            value={selectUser}
            className="form__users"
            data-cy="userSelect"
            onChange={event => {
              setIsUser(false);
              setSelectUser(event.target.value);
            }}
          >
            <option
              disabled
              value=""
            >
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUser && (
            <span className="form__error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          className="form__submit button"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
