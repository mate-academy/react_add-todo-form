import { ChangeEvent, MouseEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodosList } from './types/TodoList';

const combineTodosAndUser = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }
));

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [choosedUser, setChoosedUser] = useState<string>('');
  const [todos, setTodos] = useState<TodosList>(combineTodosAndUser);
  const [titleError, setTittleError] = useState<boolean>(false);
  const [choosedUserError, setChoosedUserError] = useState<boolean>(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTittleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setChoosedUser(event.target.value);
    setChoosedUserError(false);
  };

  const addTodo = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (title && choosedUser) {
      const newId = [...todos].sort((idOne, idTwo) => {
        return idTwo.id - idOne.id;
      })[0].id + 1;

      const findedUser = usersFromServer.find(user => user.id === +choosedUser);

      const newTodo = {
        id: newId,
        title,
        completed: false,
        userId: +choosedUser,
        user: findedUser,
      };

      setTodos((prevTodos) => (
        [...prevTodos, newTodo]
      ));
      setTitle('');
      setChoosedUser('');
    } else {
      if (!title) {
        setTittleError(true);
      }

      if (!choosedUser) {
        setChoosedUserError(true);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          {titleError
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={choosedUser}
            onChange={handleSelect}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {choosedUserError
            && (
              <span className="error">
                Please choose a user
              </span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
