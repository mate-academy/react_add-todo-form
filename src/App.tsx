import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const getUserById = (id: number) => {
    const search = usersFromServer.find(usr => usr.id === id) as User;

    if (!search) {
      throw new Error('user not found');
    }

    return search;
  };

  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({ ...todo, user: getUserById(todo.userId) })),
  );

  const [title, setTitle] = useState('');

  const [inputTouched, setInputTouched] = useState(false);
  const [userNotSelected, setUserNotSelected] = useState(false);

  const getTodoId = () => Math.max(...todos.map(todo => todo.id)) + 1;
  const reset = () => {
    setTitle('');
    setInputTouched(false);
    setSelectedUser(0);
    setUserNotSelected(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserNotSelected(selectedUser === 0);
    setInputTouched(!title);

    if (selectedUser === 0 || !title) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(),
      title: title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setTodos([...todos, newTodo]);
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
            placeholder="Enter title"
            value={title}
            onChange={e => {
              setInputTouched(true);
              setTitle(e.target.value);
            }}
          />
          {inputTouched && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => setSelectedUser(+e.target.value)}
          >
            <option value="0" disabled key={0}>
              Choose a user
            </option>

            {usersFromServer.map(usr => {
              return (
                <option key={usr.id} value={usr.id}>
                  {usr.name}
                </option>
              );
            })}
          </select>

          {userNotSelected && selectedUser === 0 && (
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
