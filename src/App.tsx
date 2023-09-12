import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserData(userId: number) {
  const userData = usersFromServer.find((user) => user.id === userId);

  return userData || null;
}

export const todosWithUsers: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserData(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);

  function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError('');
  }

  function handleUserSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserError('');
  }

  function clearErrors() {
    setTitleError('');
    setUserError('');
  }

  function handleOnAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      setUserError('Please choose a user');
    } else {
      setUserError('');
    }

    if (!title) {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }

    const maxTodoId = Math.max(...todos.map((todo) => todo.id), 0);

    const newTodo = {
      id: maxTodoId + 1,
      completed: false,
      title,
      userId: +userId,
      user: getUserData(+userId),
    };

    if (title && userId !== 0) {
      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
      clearErrors();
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnAdd}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelection}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
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
