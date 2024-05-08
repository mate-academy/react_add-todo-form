import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDoWithUser } from './types/Todo';

const todosWithUsers: ToDoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

const findMaxId = (todos: ToDoWithUser[]) => {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids);
};

export const App = () => {
  const [todos, setTodos] = useState<ToDoWithUser[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelecteduserId] = useState('0');
  const [selectedUserIdError, setSelecteduserIdError] = useState(false);

  const handleResetForm = () => {
    setTitle('');
    setTitleError(false);

    setSelecteduserId('0');
    setSelecteduserIdError(false);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = !!title.trim();
    const isUserValid = selectedUserId !== '0';

    if (!isTitleValid) {
      setTitleError(true);
    }

    if (!isUserValid) {
      setSelecteduserIdError(true);
    }

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo: ToDoWithUser = {
      id: findMaxId(todos) + 1,
      title,
      userId: +selectedUserId,
      completed: false,
      user:
        usersFromServer.find(person => person.id === +selectedUserId) || null,
    };

    setTodos(current => [...current, newTodo]);

    handleResetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            placeholder="Enter a title"
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelecteduserId(event.target.value);
              setSelecteduserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError && (
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
