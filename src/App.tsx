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

function getUserByID(id: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === id);

  return foundUser || null;
}

function getMaxId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorUsers, setIsErrorUsers] = useState(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (isErrorTitle) {
      setIsErrorTitle(false);
    }

    setTitle(event.target.value);
  };

  const handleChangeUsers = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsErrorUsers(false);
    setUserId(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const user = getUserByID(+userId);

    if (!trimmedTitle) {
      setIsErrorTitle(true);
    }

    if (!user) {
      setIsErrorUsers(true);
    }

    if (!trimmedTitle || !user) {
      return;
    }

    const newId = getMaxId(visibleTodos);

    const elementToAdd: Todo = {
      id: newId,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    setVisibleTodos([...visibleTodos, elementToAdd]);
    setTitle('');
    setUserId('0');
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

            {isErrorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="newTodoUser">
            User:

            <select
              id="newTodoUser"
              data-cy="userSelect"
              value={userId}
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

            {isErrorUsers && (
              <span className="error">Please choose a user</span>
            )}
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
