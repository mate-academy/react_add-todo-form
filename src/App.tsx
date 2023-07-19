import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

const getNewTodoId = (allTodos: Todo[]): number => {
  return Math.max(...allTodos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
      .split('')
      .filter(el => {
        const regExpEng = /[A-Za-z]/gi;
        const regExpUa = /[А-ЕЖ-ЩЬЮЯЄҐІЇа-еж-щьюяєґії]/gi;
        const regExpDigAndSpace = /[0-9]| /gi;

        return regExpEng.test(el)
          || regExpUa.test(el)
          || regExpDigAndSpace.test(el);
      })
      .join('');

    setTitle(newValue);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (selectedUserId < 1) {
      setUserError(true);
    }

    if (!title || selectedUserId < 1) {
      return;
    }

    const newTodo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: selectedUserId,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
    setSelectedUserId(0);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          &nbsp;
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          &nbsp;
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            defaultValue={0}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.username}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
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
