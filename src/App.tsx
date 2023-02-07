import { ChangeEvent, FormEvent, useState } from 'react';
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
  const [title, setTitle] = useState('');
  const [choosedUserId, setChoosedUserId] = useState(0);
  const [todos, setTodos] = useState<TodosList>(combineTodosAndUser);
  const [titleError, setTittleError] = useState(false);
  const [choosedUserError, setChoosedUserError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTittleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setChoosedUserId(+event.target.value);
    setChoosedUserError(false);
  };

  const reset = () => {
    setTitle('');
    setChoosedUserId(0);
  };

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && choosedUserId) {
      const newId = Math.max(...todos.map(todo => todo.id)) + 1;
      const findedUser = usersFromServer.find(user => (
        user.id === choosedUserId
      ));

      const newTodo = {
        id: newId,
        title,
        completed: false,
        userId: choosedUserId,
        user: findedUser,
      };

      setTodos((prevTodos) => (
        [...prevTodos, newTodo]
      ));

      reset();
    } else {
      setTittleError(!title);
      setChoosedUserError(!choosedUserId);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={addTodo}>
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
            value={choosedUserId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
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
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
