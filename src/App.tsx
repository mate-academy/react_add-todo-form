import { FormEvent, useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User, TodoUser } from './react-app-env';

enum FormElementEnum {
  USER = 'user',
  TITLE = 'title',
}

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const users: User[] = usersFromServer.map(user => ({ ...user }));
const todos: TodoUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todosNow, setTodosNow] = useState(todos);
  const [titleValue, setTitleValue] = useState('');
  const [userValue, setUserValue] = useState('0');
  const [isValidSelect, setIsValidUserSelect] = useState(true);
  const [isValidInput, setIsValidInput] = useState(true);

  const resetForm = () => {
    setTitleValue('');
    setUserValue('0');
  };

  const resetValidation = () => {
    if (titleValue) {
      setIsValidInput(true);
    }

    if (userValue !== '0') {
      setIsValidUserSelect(true);
    }
  };

  useEffect(() => {
    resetValidation();
  }, [titleValue, userValue]);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const maxIdtodos = Math.max(...todosNow.map(todo => todo.id));
    const userCange = users.find(user => user.name === userValue);

    const newTodo: TodoUser = {
      id: maxIdtodos + 1,
      title: titleValue,
      completed: false,
      userId: (userCange && userCange.id) || 0,
      user: (userCange && userCange) || null,
    };

    if (titleValue) {
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }

    if (userValue !== '0') {
      setIsValidUserSelect(true);
    } else {
      setIsValidUserSelect(false);
    }

    if (userCange && newTodo.title) {
      setTodosNow(() => ([...todosNow, newTodo as TodoUser]));
      resetForm();
    }
  };

  const handlerFormElement = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = (e.target as HTMLInputElement | HTMLSelectElement);

    switch (name) {
      case FormElementEnum.TITLE:
        setTitleValue(value);
        break;
      case FormElementEnum.USER:
        setUserValue(value);
        break;

      default:
        break;
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            name={FormElementEnum.TITLE}
            onChange={handlerFormElement}
          />
          {
            !isValidInput && (
              <span className="error">
                Please enter a title
              </span>
            )
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userValue}
            name={FormElementEnum.USER}
            onChange={handlerFormElement}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {
            !isValidSelect
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todosList={todosNow} />
      </section>
    </div>
  );
};
