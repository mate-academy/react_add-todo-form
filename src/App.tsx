import './App.scss';
import { FC, useState, useEffect } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// eslint-disable-next-line import/no-cycle
import { TodoList } from './components/TodoList';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string
}

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newUserId, setNewUserId] = useState<number | null>(null);

  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  function getUser(userId: number): User | null {
    const foundUser = users.find(user => user.id === userId);

    return foundUser || null;
  }

  const currentTodos: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const clearForm = () => {
    setNewUserId(null);
    setNewTodoTitle('');
    setTitleErrorMessage('');
    setUserErrorMessage('');
  };

  const getNewId = (arr: { id: number }[]): number => {
    const ids = arr.map((item) => item.id);
    const maxId = Math.max(...ids);

    return Number.isFinite(maxId) ? maxId + 1 : 1;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle || !newUserId) {
      setUserErrorMessage(newUserId ? '' : 'Please choose a user');
      setTitleErrorMessage(newTodoTitle ? '' : 'Please enter a title');

      return;
    }

    setTodos(prevTodoList => {
      const newTodo: Todo = {
        id: getNewId(prevTodoList),
        title: newTodoTitle,
        completed: false,
        userId: newUserId,
        user: getUser(newUserId),
      };

      return [...prevTodoList, newTodo];
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={event => {
                setTitleErrorMessage('');
                setNewTodoTitle(event.target.value);
              }}
            />
          </label>
          {titleErrorMessage
          && <span className="error">{titleErrorMessage}</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={newUserId ? newUserId.toString() : ''}
              onChange={event => {
                setUserErrorMessage('');
                setNewUserId(Number(event.target.value) || null);
              }}
            >
              <option value="" disabled selected>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userErrorMessage
          && <span className="error">{userErrorMessage}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
