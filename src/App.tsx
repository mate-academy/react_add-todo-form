import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

export const findUser = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export const todosData: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [usertitle, setUserTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [user, setUser] = useState(0);
  const [todos, setTodos] = useState(todosData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usertitle) {
      setErrorTitle(true);
    }

    if (!user) {
      setErrorName(true);
    }

    if (!usertitle || !user) {
      return;
    }

    const todoId = Math.max(...todosData.map(todo => todo.id)) + 1;

    const todoItem = {
      id: todoId,
      title: usertitle,
      userId: user,
      completed: false,
      user: findUser(user),
    };

    setTodos([...todos, todoItem]);
    setUserTitle('');
    setUser(0);
  };

  const handleChange
    = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'usertitle') {
        setUserTitle(value);
        setErrorTitle(false);
      }

      if (name === 'username') {
        setUser(+value);
        setErrorName(false);
      }
    };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            name="usertitle"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={usertitle}
            onChange={handleChange}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="username"
            value={user}
            onChange={handleChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(currentUser => (
              <option
                key={currentUser.id}
                value={currentUser.id}
              >
                {currentUser.name}
              </option>
            ))}
          </select>

          {errorName && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
