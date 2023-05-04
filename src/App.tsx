import { FormEvent, useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(todoUserId: number): User | null {
  const userObj = usersFromServer.find(user => user.id === todoUserId);

  return userObj || null;
}

export const newTodos: Todo[] = todosFromServer.map((todo) => {
  return {
    id: todo.id,
    title: todo.title,
    userId: todo.userId,
    completed: todo.completed,
    user: getUser(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setOption] = useState('0');
  const [tittleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodo] = useState(newTodos);

  function newTodoId() {
    let { id } = todos[0];

    for (let i = 0; i < todos.length; i += 1) {
      if (id < todos[i].id) {
        id = todos[i].id;
      }
    }

    return id;
  }

  const handlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title !== '' && userName !== '0') {
      const user = usersFromServer
        .find((userFromServer) => (
          userFromServer.id === Number(userName))) || null;

      const todoId = newTodoId();

      setTodo([
        ...todos,
        {
          id: todoId + 1,
          title,
          completed: false,
          userId: user?.id || null,
          user,
        },
      ]);

      setTitle('');
      setOption(('0'));
      setTitleError(false);
      setUserError(false);
    } else {
      if (title === '') {
        setTitleError(true);
      } else {
        setTitleError(false);
      }

      if (userName === '0') {
        setUserError(true);
      } else {
        setUserError(false);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handlerSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="titleInput"
            value={title}
            onChange={event => {
              const value = event.target.value;
              if (/^[a-zA-Zа-яА-Я0-9\s]*$/i.test(value)) {
                setTitle(value);
                setTitleError(false);
              }
            }}
          />

          {tittleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userName}
            onChange={event => {
              setOption(event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user, index) => {
              return (
                <option value={index + 1} key={user.id}>{user.name}</option>
              );
            })}
          </select>

          {userError && (
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
