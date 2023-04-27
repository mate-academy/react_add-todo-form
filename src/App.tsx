import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

function getUserById(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

const updatedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(updatedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState(0);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserName(0);
  };

  const createNewTodoId = () => (
    Math.max(...todos.map(todo => todo.id)) + 1
  );

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Zа-яА-Я0-9\s]*$/;
    const input = event.target.value.trimStart();

    if (regex.test(input)) {
      setTitle(input);
      setTitleError(false);
    } else {
      setTitleError(true);
    }
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(Number(event.target.value));
    setUserError(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const user = getUserById(userName);

    event.preventDefault();

    setTitleError(!title);
    setUserError(!userName);

    const newTodo: Todo = {
      id: createNewTodoId(),
      userId: userName,
      title,
      completed: false,
      user,
    };

    if (title && userName) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
              data-cy="titleInput"
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              value={userName}
              onChange={handleUser}
              data-cy="userSelect"
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
