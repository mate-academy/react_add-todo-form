import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/index';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, SetTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [validUser, setValidUser] = useState(false);
  const [validTitle, setValidTitle] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = Math.max(...todos.map((todo) => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    if (!userId) {
      setValidUser(true);
    }

    if (!title.trim()) {
      setValidTitle(true);
    }

    if (userId && title.trim()) {
      todos.push(newTodo);
      SetTitle('');
      setUserId(0);
      setValidUser(false);
      setValidTitle(false);
    }
  };

  type Props =
    React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;

  const setFieldValue = (event: Props) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        SetTitle(value);
        setValidTitle(false);

        break;

      case 'userId':
        setUserId(+value);
        setValidUser(false);

        break;

      default:
        throw new Error('Please enter a title. Please choose a user.');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={setFieldValue}
            />
          </label>

          {validTitle
          && <span className="Error">Please enter a title.</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="UserId"
              value={userId}
              onChange={setFieldValue}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ id, name }) => {
                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {validUser
            && <span className="Error">Please choose a user.</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
