import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { FullTodo } from './tipes/Todo';
import { User } from './tipes/User';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const getTodos: FullTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<FullTodo[]>(getTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userName, setUserName] = useState(0);
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(+event.target.value);
    setHasUserNameError(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserName(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const biggestId: number = Math.max(...todos.map(todo => todo.id));

    setHasTitleError(!title);
    setHasUserNameError(!userName);

    const newTodo = {
      id: biggestId + 1,
      title,
      completed: false,
      userId: +userName,
      user: getUserById(+userName),
    };

    if (userName && title) {
      setTodos(currentTodo => [...currentTodo, newTodo]);
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
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userName}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(item => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}

          </select>

          {hasUserNameError && (
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
