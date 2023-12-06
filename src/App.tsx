import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { generateTodoId, getUserById } from './helpers/helpers';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isErrorShown, setisErrorShown] = useState({
    select: false,
    title: false,
  });

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.target.value;

    setTodoTitle(titleValue);
    setisErrorShown(prevState => ({
      ...prevState,
      title: false,
    }));
  };

  const onTitleBlur = () => {
    if (!todoTitle.trim()) {
      setisErrorShown(prevState => ({
        ...prevState,
        title: true,
      }));
    }
  };

  const onUserSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(+event.target.value);
    setisErrorShown(prevState => ({
      ...prevState,
      select: false,
    }));
  };

  const onBlurUserSelect = () => {
    if (selectedUserId === null) {
      setisErrorShown(prevState => ({ ...prevState, select: true }));

      return;
    }

    setisErrorShown(prevState => ({ ...prevState, select: false }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUserId && !todoTitle.trim()) {
      setisErrorShown({
        select: true,
        title: true,
      });

      return;
    }

    if (!selectedUserId) {
      setisErrorShown(prevState => ({
        ...prevState,
        select: true,
      }));

      return;
    }

    if (!todoTitle.trim()) {
      setisErrorShown(prevState => ({
        ...prevState,
        title: true,
      }));

      return;
    }

    const newTodo = {
      id: generateTodoId(todos),
      title: todoTitle.trim(),
      completed: false,
      userId: selectedUserId,
      user: getUserById(usersFromServer, selectedUserId),
    };

    setTodos(prevTodos => [
      ...prevTodos,
      newTodo,
    ]);

    setTodoTitle('');
    setSelectedUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={todoTitle}
              onChange={onTitleChange}
              onBlur={onTitleBlur}
              placeholder="Write the title"
            />
          </label>
          {
            isErrorShown.title
            && <span className="error">Please enter a title</span>
          }

        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              onChange={onUserSelect}
              value={selectedUserId ?? '0'}
              onBlur={onBlurUserSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {isErrorShown.select && (
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
