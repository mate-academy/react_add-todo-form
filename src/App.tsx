import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
} from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo, User } from './react-app-env';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const fullTodos: FullTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<FullTodo[]>(fullTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);

  const resetForm = () => {
    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimedNewTitle = newTodoTitle.trim();

    setHasTitleError(!trimedNewTitle);
    setHasSelectedUserError(!selectedUserId);

    if (!trimedNewTitle || !selectedUserId) {
      return;
    }

    const MaxIdTodo = todos.reduce((prev, curr) => (
      prev.id > curr.id ? prev : curr
    ));
    const newTodo = {
      id: MaxIdTodo.id + 1,
      title: newTodoTitle,
      completed: false,
      userId: selectedUserId,
      user: getUser(+selectedUserId),
    };

    if (!hasTitleError && !hasSelectedUserError) {
      setTodos([...todos, newTodo]);
      resetForm();
    }
  };

  const handleNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value.replace(/[^a-zа-я\s\d]/gi, '');

    setNewTodoTitle(eventValue);
    setHasTitleError(!eventValue);
  };

  const handleNewUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const eventValue = event.target.value;

    setSelectedUserId(+eventValue);
    setHasSelectedUserError(!+eventValue);
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
          <label htmlFor="titleInput">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              value={newTodoTitle}
              placeholder="Enter a title"
              onChange={handleNewTitleChange}
            />
          </label>

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userInput">
            User:
            <select
              data-cy="userSelect"
              id="userInput"
              value={selectedUserId}
              onChange={handleNewUserChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {hasSelectedUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
