import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const getNewTodoId = (newTodo: Todo[]): number => {
  const maxId = Math.max(...newTodo.map((todo: Todo) => todo.id));

  return maxId + 1;
};

const inTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isSelectUser, setIsSelectUser] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(inTodo);

  const addTodo = ({ id, ...data }: Todo): void => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsSelectUser(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsEmptyTitle(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setIsEmptyTitle(false);
    setIsSelectUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsSelectUser(!userId);
    setIsEmptyTitle(!title);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: 0,
      userId,
      user: getUserById(userId),
      title,
      completed: false,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {isEmptyTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isSelectUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
