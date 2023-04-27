import './App.scss';
import { FC, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [titleValue, setTitleValue] = useState('');
  const [usersValue, setUsersValue] = useState('0');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!titleValue) {
      setErrorTitle(true);
    }

    if (usersValue === '0') {
      setErrorUsers(true);
    }

    if (titleValue && usersValue !== '0') {
      const newId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

      const elementToAdd: Todo = {
        id: newId,
        title: titleValue,
        completed: false,
        userId: +usersValue,
        user: getUser(+usersValue),
      };

      setVisibleTodos([...visibleTodos, elementToAdd]);
      setTitleValue('');
      setUsersValue('0');
      setErrorTitle(false);
      setErrorUsers(false);
    }
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
              value={titleValue}
              onChange={event => setTitleValue(event.target.value)}
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
              onChange={(event) => setUsersValue(event.target.value)}
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
