import './App.scss';

 import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const findMaxId = (todos: TodoWithUser[]) => {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids);
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasErorId, setHasErorId] = useState(false);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(event?.target.value.trimStart());
  setHasTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasErorId(false);
  }

  const handeleResetForm = () => {
    setTitle('');
    setHasTitleError(false);

    setUserId(0)
    setHasErorId(false);
  }

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasErorId(!userId);
    setHasTitleError(!title);

    if (!title || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: findMaxId(todos) + 1,
      title,
      userId: +userId,
      completed: false,
      user:
      usersFromServer.find(user => user.id === +userId) || null,
    }

    setTodos(current => [...current, newTodo]);

    handeleResetForm();
  }
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
        <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder='Enter a title'
            value={title}
            onChange={handleInputTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User:</label>
          <select
            data-cy="userSelect"
            id="user-id"
            value={userId}
            onChange={handleSelectUser}
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
          {hasErorId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
