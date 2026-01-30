import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = title.trim() === '';
    const isUserInvalid = userId === '0';

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: Number(userId),
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title
          </label>

          <input
            id="todo-title"
            data-cy="titleInput"
            className={`input ${titleError ? 'is-danger' : ''}`}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="Todo title"
          />

          {titleError && (
            <p className="help is-danger error">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user">
            User
          </label>

          <div className={`select ${userError ? 'is-danger' : ''}`}>
            <select
              id="todo-user"
              data-cy="userSelect"
              value={userId}
              onChange={e => {
                setUserId(e.target.value);
                setUserError(false);
              }}
            >
              <option value="0">Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {userError && (
            <p className="help is-danger error">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          className="button is-primary"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
