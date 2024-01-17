import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [todoTextError, setTodoTextError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState([...todosFromServer]);

  function getMaxId() {
    const maxId: number = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  function getTodosWithUser(id: number) {
    return usersFromServer.find(user => user.id === id);
  }

  const visibleTodos = todos.map(todo => (
    { ...todo, user: getTodosWithUser(todo.userId) as User }
  ));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titleInput.trim()) {
      setTodoTextError(true);
      setTitleInput('');
    }

    if (userSelect === 0) {
      setUserError(true);
    }

    if (userSelect && titleInput.trim()) {
      setTodos([...todos, {
        id: getMaxId(),
        title: titleInput,
        completed: false,
        userId: userSelect,
      }]);

      setTitleInput('');
      setUserSelect(0);
      setTodoTextError(false);
      setUserError(false);
    }
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
          <label htmlFor="">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleInput}
              onChange={event => {
                setTitleInput(event.currentTarget.value);
                setTodoTextError(false);
              }}
            />
            {todoTextError && (
              <span className="error">Please enter a title</span>
            )}

          </label>
        </div>

        <div className="field">
          <label htmlFor="">
            {'User: '}
            <select
              data-cy="userSelect"
              defaultValue={0}
              onChange={(event) => {
                setUserSelect(+event.currentTarget.value);
                setUserError(false);
              }}
              value={userSelect}
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
            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={visibleTodos}
      />
    </div>
  );
};
