import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const App = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })),
  );
  const [errorTitleInput, setErrorTitleInput] = useState('');
  const [errorUserSelect, setErrorUserSelect] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleTodo && selectedUser === '0') {
      setErrorTitleInput('Please enter a title');
      setErrorUserSelect('Please choose a user');

      return;
    } else if (!titleTodo) {
      setErrorTitleInput('Please enter a title');
      setErrorUserSelect('');

      return;
    } else if (selectedUser === '0') {
      setErrorTitleInput('');
      setErrorUserSelect('Please choose a user');

      return;
    } else {
      setErrorTitleInput('');
      setErrorUserSelect('');
    }

    const greatestId = Math.max(...todos.map(todo => todo.id + 1));
    const newTodo: Todo = {
      id: greatestId,
      title: titleTodo,
      completed: false,
      user: getUser(parseInt(selectedUser)),
      userId: parseInt(selectedUser),
    };

    setTodos([...todos, newTodo]);

    setTitleTodo('');
    setSelectedUser('0');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(event.target.value);
    setErrorTitleInput('');
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(event.target.value);
    setErrorUserSelect('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              value={titleTodo}
              onChange={handleTitleChange}
            />
            <span
              className="error"
              style={{ display: errorTitleInput ? 'inline' : 'none' }}
            >
              Please enter a title
            </span>
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:{' '}
            <select
              data-cy="userSelect"
              className="userSelect"
              id="userSelect"
              value={selectedUser.toString()}
              onChange={handleUserSelectChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user, index) => (
                <option key={user.id} value={index + 1}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <span
            className="error"
            style={{ display: errorUserSelect ? 'inline' : 'none' }}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
