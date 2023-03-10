import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';

const combined = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    userServer => userServer.id === todo.userId,
  );

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodosFromServer] = useState([...combined]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newId, setNewId] = useState(0);
  const [isEmptyTitle, setErrorTitle] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleReset = () => {
    setNewTodoTitle('');
    setErrorTitle(false);
    setIsUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle === '') {
      setErrorTitle(true);
    }

    if (newId === 0) {
      setIsUserError(true);
    }

    if (newTodoTitle === '' || newId === 0) {
      return;
    }

    if (newTodoTitle.trim() === '') {
      setErrorTitle(true);

      return;
    }

    const user = usersFromServer[newId - 1];

    const newTodo: TodoWithUser = {
      id: todosFromServer.length + 1,
      title: newTodoTitle,
      completed: false,
      userId: newId,
      user: {
        email: user.email,
        id: newId,
        name: user.name,
        username: user.username,
      },
    };

    setTodosFromServer(currentTodos => ([...currentTodos, newTodo]));
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <span>Title:</span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          {isEmptyTitle && newTodoTitle.trim() === ''
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User:</span>
          <select
            data-cy="userSelect"
            id="mySelect"
            onChange={(e) => {
              return (setNewId(+e.target.value), setIsUserError(false));
            }}
          >
            <option value="0" key="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
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

      <TodoList todos={todos} />
    </div>
  );
};
