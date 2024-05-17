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

    let titleError = '';
    let userError = '';

    if (!titleTodo) {
      titleError = 'Please enter a title';
    }

    if (selectedUser === '0') {
      userError = 'Please choose a user';
    }

    setErrorTitleInput(titleError);
    setErrorUserSelect(userError);

    if (titleError || userError) {
      return;
    }

    const greatestId = Math.max(...todos.map(todo => todo.id)) + 1;
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
            {errorTitleInput && (
              <span className="error">{errorTitleInput}</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:{' '}
            <select
              data-cy="userSelect"
              className="userSelect"
              id="userSelect"
              value={selectedUser}
              onChange={handleUserSelectChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {errorUserSelect && <span className="error">{errorUserSelect}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
