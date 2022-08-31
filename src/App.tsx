import './App.scss';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import User from './types/User';
import Todo from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const combinedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('-1');
  const [userError, setUserError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(combinedTodos);
  const [titleLanguageError, setTitleLanguageError] = useState(false);

  const hadleTitle = (event: FormEvent<HTMLInputElement>) => {
    setTitleLanguageError(/[А-яа-я]/g.test(event.currentTarget.value));

    setTodoTitle(event.currentTarget.value
      .replace(/[^A-Za-z]/g, ''));

    if (event.currentTarget.value) {
      setTitleError(false);
    }
  };

  const validation = () => {
    if (selectedUser !== '-1' && todoTitle !== '') {
      return true;
    }

    if (selectedUser === '-1') {
      setUserError(true);
    }

    if (todoTitle === '') {
      setTitleError(true);
    }

    return false;
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }

    const todoId = todos.reduce((acc, curr) => Math.max(acc, curr.id), -1) + 1;

    const todoToAdd = {
      id: todoId,
      title: todoTitle,
      userId: +selectedUser,
      completed: false,
      user: getUser(+selectedUser),
    };

    setSelectedUser('-1');
    setTodoTitle('');
    setTitleError(false);
    setTitleLanguageError(false);

    setTodos(prevState => [
      ...prevState,
      todoToAdd,
    ]);
  };

  return (
    <div className="App panel">
      <h1
        className="heading is-size-3"
      >
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            className="input"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={hadleTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
          <br />
          {titleLanguageError
            && <span className="error">Only english characters</span>}
        </div>
        <label
          className="label"
          htmlFor="select"
        >
          User:
        </label>
        <div className="select is-rounded">
          <select
            id="select"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              setUserError(false);
            }}
          >
            <option value="-1" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
