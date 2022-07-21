import React, { useState } from 'react';

import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/TodoInfo/TodoInfo';
import { TodoList } from './components/TodoList/TodoList';

export const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId)
    || null,
  };
});

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [titleTodo, setTitleTodo] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newUser = users.find(user => user.name === selectUser) || null;

    let userId = 0;

    if (newUser) {
      userId = newUser.id;
    }

    const newTodo: Todo = {
      id: todos[todos.length - 1].id + 1,
      title: titleTodo,
      userId,
      completed: false,
      user: newUser,
    };

    setIsTitle(!titleTodo);
    setIsUser(!selectUser);

    if (!titleTodo || !selectUser) {
      return;
    }

    setTodos([...todos, newTodo]);
    setTitleTodo('');
    setSelectUser('');
  };

  return (
    <div className="container">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field__title">
          <input
            type="text"
            className="input"
            data-cy="titleInput"
            placeholder="write a title"
            value={titleTodo}
            onChange={event => {
              setTitleTodo(event.target.value);
              setIsTitle(false);
            }}
          />

          {isTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field__select">
          <select
            className="select"
            value={selectUser}
            data-cy="userSelect"
            onChange={event => {
              setIsUser(false);
              setSelectUser(event.target.value);
            }}
          >
            <option value="">
              Choose a name
            </option>

            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUser && (
            <span className="error">Please enter a name</span>
          )}
        </div>

        <button className="button" type="submit">
          ADD
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
