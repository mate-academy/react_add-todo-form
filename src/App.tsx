import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [selectUserId, setSelectUserId] = useState('');
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [input, setInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Math.max(...todos.map(todoId => todoId.id)) + 1,
      title: input,
      completed: false,
      userId: +selectUserId,
      user: getUser(+selectUserId),
    };

    setCurrentTodos([...currentTodos, newTodo]);

    setInput('');
    setSelectUserId('');
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setIsInputError(false);
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input && selectUserId) {
      addTodo();
    }

    setIsInputError(!input);
    setIsUserError(!selectUserId);
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
          <input
            type="text"
            data-cy="titleInput"
            value={input}
            onChange={handleTitleInput}
            placeholder="Enter a title"
          />
          {isInputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectUserId}
            onChange={handleUserInput}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
