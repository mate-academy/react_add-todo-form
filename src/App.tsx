import './App.scss';
import { ChangeEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function findUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todoId: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [userName, setUserName] = useState(0);
  const [title, setTitle] = useState('');
  const [visibleTodos, setTodos] = useState(todoId);
  const [isErrorTitle, setTitleError] = useState(false);
  const [isErrorUserName, setUserNameError] = useState(false);

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(+event.target.value);
    setUserNameError(false);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const maxId = Math.max(...visibleTodos.map(todo => todo.id));

  const resetForm = () => {
    setUserName(0);
    setTitle('');
  };

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError(!title);
    setUserNameError(!userName);

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: userName,
      user: findUser(userName),
    };

    if (title && userName) {
      setTodos(currentTodo => [
        ...currentTodo,
        newTodo,
      ]);

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
          <label htmlFor="todoTitle">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            id="#todoTitle"
            onChange={handleTitle}
          />
          {isErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="#userSelect"
            value={userName}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isErrorUserName
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
