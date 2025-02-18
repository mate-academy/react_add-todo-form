import './App.scss';
import { ChangeEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const [todosList, setTodosList] = useState<(Todo & { user: User })[]>(() =>
    todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      if (!user) {
        alert('User not found');

        return {
          ...todo,
          user: {
            id: 0,
            name: '',
            username: '',
            email: '',
          },
        };
      }

      return {
        ...todo,
        user,
      };
    }),
  );

  const [textForNewTodo, setTextForNewTodo] = useState<string>('');

  const [selectedUser, setSelectedUser] = useState<string>('0');

  const [hasErrorOnTitle, setHasErrorOnTitle] = useState<boolean>(true);

  const [hasErrorOnUser, setHasErrorOnUser] = useState<boolean>(true);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value !== '') {
      setHasErrorOnTitle(false);
    }

    setTextForNewTodo(e.target.value);
  }

  function handleUserChange(e: ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value !== '0') {
      setHasErrorOnUser(false);
    }

    setSelectedUser(e.target.value);
  }

  function handleCreateNewTodo(): void {
    if (textForNewTodo !== '') {
      setHasErrorOnTitle(false);
    }

    if (selectedUser !== '0') {
      setHasErrorOnUser(false);
    }

    if (textForNewTodo === '') {
      setHasErrorOnTitle(true);

      return;
    }

    if (selectedUser === '0') {
      setHasErrorOnUser(true);

      return;
    }

    const newId =
      todosList
        .map(todo => todo.id)
        .sort((a, b) => a - b)
        .pop()! + 1;
    const user = usersFromServer.find(u => u.id === Number(selectedUser));

    if (!user) {
      alert('User not found');

      return;
    }

    const newTodo: Todo & { user: User } = {
      id: newId,
      title: textForNewTodo,
      completed: false,
      userId: user.id,
      user: user,
    };

    setTodosList([...todosList, newTodo]);

    setTextForNewTodo('');
    setSelectedUser('0');
    setHasErrorOnTitle(true);
    setHasErrorOnUser(true);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          handleCreateNewTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Title of todo"
            onChange={handleTextChange}
            value={textForNewTodo}
            data-cy="titleInput"
          />
          {hasErrorOnTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            onChange={handleUserChange}
            value={selectedUser}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>

        {hasErrorOnUser && <span className="error">Please choose a user</span>}

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
