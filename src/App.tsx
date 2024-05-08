import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { TodoList } from './components/TodoList';
import { User } from './types/user';

function getUserId(userId: number): User | null {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const getTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

function getNewId(todos: Todo[]) {
  const newId = Math.max(...todos.map(todo => todo.id));

  return newId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(getTodoList);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !userId) {
      setTitleError(!title.trim());
      setUserError(!userId);

      return;
    }

    const newTodo = {
      id: getNewId(todos),
      title: title.trim(),
      userId,
      completed: false,
      user: getUserId(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          <span className="error">{titleError && 'Please enter a title'}</span>
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>
          <select
            id="user-id"
            value={userId}
            data-cy="userSelect"
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {`${user.name}`}
              </option>
            ))}
          </select>

          <span className="error">{userError && 'Please choose a user'}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
