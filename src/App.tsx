import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './App.types';
import { TodoList } from './components/TodoList';

const todosWithUser: TodoWithUser[] = todosFromServer.map(
  (todo): TodoWithUser => {
    const user = usersFromServer.find(
      userInfo => userInfo.id === todo.userId,
    ) as User;

    return {
      ...todo,
      user,
    };
  },
);

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([...todosWithUser]);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('0');

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          if (title && userName) {
            const newTodo: TodoWithUser = {
              userId: usersFromServer.find(user => user.name === userName)
                ?.id as number,
              id: Math.max(...todos.map(todo => todo.id)) + 1,
              title,
              completed: false,
              user: usersFromServer.find(
                user => user.id === Number(userName),
              ) as User,
            };

            setTodos([...todos, newTodo]);
            setTitle('');
            setUserName('0');
          }
        }}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
