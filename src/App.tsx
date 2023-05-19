import './App.scss';
import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const mapTodosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState(mapTodosWithUsers);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const findUniqueTodoId = (): number => {
    const temp = [...todos].sort((a, b) => b.id - a.id);
    const lastId = temp[0]?.id || 0;

    return lastId + 1;
  };

  const createTodo = () => ({
    id: findUniqueTodoId(),
    userId,
    title: todoTitle,
    completed: false,
    user: findUserById(userId),
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (userId === 0) {
      setIsUserError(true);
    } else {
      setIsUserError(false);
    }

    if (!todoTitle) {
      setIsTitleError(true);
    } else {
      setIsTitleError(false);
    }

    if (userId > 0 && todoTitle !== '') {
      setTodos([...todos, createTodo()]);
      setUserId(0);
      setTodoTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Task title..."
            onChange={handleInputChange}
            value={todoTitle}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={handleSelectChange}
            defaultValue={0}
            value={userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
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
