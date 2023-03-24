import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './api/types/User';
import { Todo } from './api/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const newUsers = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [list, setList] = useState(newUsers);
  const [errorUser, showErrorUser] = useState(false);
  const [errorTitle, showErrorTitle] = useState(false);

  const handleClear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const formSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      showErrorTitle(true);
    }

    if (!selectedUserId) {
      showErrorUser(true);
    }

    if (title.trim() && selectedUserId) {
      const newTodo: Todo = {
        id: Math.max(...list.map((todo) => todo.id)) + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: getUser(selectedUserId),
      };

      setList((ananas) => [...ananas, newTodo]);
      handleClear();
    }
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    showErrorUser(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    showErrorTitle(false);

    setTitle(value.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={formSubmit}>
        <div>
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Please enter a title"
              onChange={handleTitle}
            />
            {errorTitle && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <select
              data-cy="userSelect"
              onChange={handleUser}
              value={selectedUserId}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {errorUser && <span className="error">Please choose a user</span>}
          </div>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={list} />
      </section>
    </div>
  );
};
