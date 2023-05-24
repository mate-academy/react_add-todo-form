import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';
import './App.scss';

export const findUser = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};

export const todosData: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [userTitle, setUserTitle] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [user, setUser] = useState<number | null>(null);
  const [todos, setTodos] = useState(todosData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userTitle) {
      setIsErrorTitle(true);
    }

    if (!user) {
      setIsErrorName(true);
    }

    if (!userTitle || !user) {
      return;
    }

    const todoId = Math.max(...todosData.map(todo => todo.id)) + 1;

    const todoItem = {
      id: todoId,
      title: userTitle,
      userId: user,
      completed: false,
      user: findUser(user),
    };

    setTodos(prevTodos => [...prevTodos, todoItem]);
    setUserTitle('');
    setUser(null);
  };

  const handleChange
    = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'usertitle') {
        setUserTitle(value);
        setIsErrorTitle(false);
      }

      if (name === 'username') {
        setUser(+value);
        setIsErrorName(false);
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
            value={userTitle}
            onChange={handleChange}
          />
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="username"
            value={user || ''}
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

          {isErrorName && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
