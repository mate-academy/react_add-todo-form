import './App.scss';
import cn from 'classnames';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId: number) => (
  usersFromServer.find((user) => user.id === userId)
);

const GetTodosWithUsers = () => (
  todosFromServer.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }))
);

const getNewId = (array: { id: number }[]) => (
  Math.max(...array.map(el => el.id)) + 1
);

export const App = () => {
  const [todos, setTodos] = useState(GetTodosWithUsers);

  const [newTitle, setNewTitle] = useState('');
  const [newUserNameId, setNewUserNameId] = useState(0);

  const [newTitleErrorMessage, setNewTitleErrorMessage] = useState('');
  const [newUserNameIdErrorMessage, setNewUserNameIdErrorMessage]
   = useState('');

  const heandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reset = () => {
      setNewTitle('');
      setNewUserNameId(0);
    };

    if (!newUserNameId || !newTitle) {
      setNewTitleErrorMessage(!newTitle ? 'Please enter a title' : '');
      setNewUserNameIdErrorMessage(!newUserNameId
        ? 'Please choose a user'
        : '');

      return;
    }

    setTodos(prev => {
      const newTodo = {
        completed: false,
        id: getNewId(prev),
        title: newTitle,
        userId: newUserNameId,
        user: findUserById(newUserNameId),
      };

      return [...prev, newTodo];
    });

    reset();
  };

  const handleChangeNewTitle = (value: string) => {
    setNewTitle(value);
    setNewTitleErrorMessage('');
  };

  const handleChangeNewUserNameId = (value: string) => {
    setNewUserNameId(+value);
    setNewUserNameIdErrorMessage('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={heandleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={(event) => handleChangeNewTitle(event.target.value)}
              className={cn('input', {
                inputError: Boolean(newTitleErrorMessage),
              })}
            />
          </label>
          <span className={cn('Please enter a title', 'errorMessage', {
            errorMessageVisible: Boolean(newTitleErrorMessage),
          })}
          >
            {newTitleErrorMessage}
          </span>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={newUserNameId}
              onChange={(event) => handleChangeNewUserNameId(
                event.target.value,
              )}
              className={cn('input', {
                inputError: Boolean(newUserNameIdErrorMessage),
              })}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <span className={cn('ErrorMessage', 'errorMessage', {
            errorMessageVisible: Boolean(newUserNameId),
          })}
          >
            {newUserNameIdErrorMessage}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id="1"
            className={cn(todo.completed
              ? 'TodoInfo TodoInfo--completed'
              : 'TodoInfo')}
            key={todo.id}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            <a
              className={todo.user?.username}
              href={`mailto:${todo.user?.email}`}
            >
              {todo.user?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
