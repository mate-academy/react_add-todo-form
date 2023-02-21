import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const updatedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(updatedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState(0);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const newTodoId = Math.max(...todos.map(todo => todo.id));

  const resetForm = () => {
    setTitle('');
    setUserName(0);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(+event.target.value);
    setUserError(false);
  };

  const handleFormSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userName);

    const newTodo: Todo = {
      id: newTodoId + 1,
      userId: userName,
      title,
      completed: false,
      user: getUser(userName),
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
          {'Title: '}
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
            data-cy="titleInput"
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
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
