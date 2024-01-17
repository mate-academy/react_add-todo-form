import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './components/types/preparedTodo';

type PrepareFunc = () => PreparedTodo[];

export const App = () => {
  const prepareTodos: PrepareFunc = () => {
    if (!todosFromServer || !usersFromServer) {
      return [];
    }

    const todosWithUserField = todosFromServer.map((todo) => {
      const findedUser = usersFromServer
        .find((user) => todo.userId === user.id);

      return {
        ...todo,
        user: findedUser,
      };
    });

    return todosWithUserField;
  };

  const preparedTodos = prepareTodos();

  const [visibleTodos, setVisbleTodos] = useState(preparedTodos);
  const [titleValue, setTitleValue] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsTitleError(!titleValue);
    setIsUserError(!userId);

    const newId = visibleTodos.map(todo => todo.id)
      .sort((idA, idB) => idB - idA)[0] + 1;

    if (userId && titleValue) {
      setVisbleTodos(prevTodos => [...prevTodos, {
        id: newId,
        title: titleValue,
        completed: false,
        userId,
        user: usersFromServer.find((user) => user.id === userId),
      }]);

      setUserId(0);
      setTitleValue('');
    }

    if (isUserError) {
      setUserId(0);
    }

    if (isTitleError) {
      setTitleValue('');
    }
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={(event) => {
              setTitleValue(event.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={selectHandler}
          >
            <option value="0" selected disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
