import './App.scss';
import {
  FC,
  FormEvent,
  ChangeEvent,
  useState,
} from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserByID(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [usersValue, setUsersValue] = useState('0');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (errorTitle) {
      setErrorTitle(false);
    }

    setTitle(event.target.value);
  };

  const handleChangeUsers = (event: ChangeEvent<HTMLSelectElement>) => {
    setErrorUsers(false);

    setUsersValue(event.target.value);
  };

  const user = getUserByID(+usersValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorTitle(true);
    }

    if (!user) {
      setErrorUsers(true);
    }

    if (!title.trim() || !user) {
      return;
    }

    const newId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const elementToAdd: Todo = {
      id: newId,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    setVisibleTodos([...visibleTodos, elementToAdd]);
    setTitle('');
    setUsersValue('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="newTodoTitle">
            Title:
            <input
              type="text"
              id="newTodoTitle"
              data-cy="titleInput"
              placeholder="Enter a title here"
              autoComplete="off"
              value={title}
              onChange={handleChangeTitle}
            />
            {errorTitle && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="newTodoUser">
            User:
            <select
              id="newTodoUser"
              data-cy="userSelect"
              value={usersValue}
              onChange={handleChangeUsers}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}
            </select>
            {errorUsers && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
