import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/Users';

const validRegex = /^[A-Za-z\u0400-\u04FF0-9\s]+$/;

const inputValidation = (text: string) => {
  return text.trim().match(validRegex);
};

const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [selectFieldError, setSelectFieldError] = useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const getMaxId = (todoList: Todo[]) => {
    const maxId = Math.max(...todoList.map(todo => todo.id));

    return maxId + 1;
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let isTitleValid = true;
    let isUserValid = true;

    if (!inputValidation(title) || title.trim() === '') {
      setTitleError(true);
      isTitleValid = false;
    } else {
      setTitleError(false);
    }

    if (!userId) {
      setSelectFieldError(true);
      isUserValid = false;
    } else {
      setSelectFieldError(false);
    }

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo: Todo = {
      id: getMaxId(todos),
      title,
      userId,
      completed: false,
      user: users.find(user => user.id === userId) || null,
    };

    addTodo(newTodo);

    // reset form
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => setUserId(Number(e.target.value))}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectFieldError && (
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
