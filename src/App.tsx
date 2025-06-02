/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { TodoWithUser, TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [userSelected, setUserSelected] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<TodoWithUser[]>(() =>
    todosFromServer.map(todo => {
      const user = usersFromServer.find(usr => usr.id === todo.userId)!;

      return {
        ...todo,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),
  );
  const [title, setTitle] = useState('');

  const usersWithTasks = usersFromServer.map(user => {
    const todo = todosFromServer.find(tudu => tudu.userId === user.id);

    return {
      ...user,
      todoTitle: todo?.title,
      todoCompleted: todo?.completed,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onAddToDoHandle = (userSelected: number, title: string) => {
    const user = usersFromServer.find(u => u.id === userSelected);
    const maxId = visibleTodos.reduce((max, todo) => Math.max(max, todo.id), 0);

    if (!user) {
      return;
    }

    setVisibleTodos([
      ...visibleTodos,
      {
        id: maxId + 1,
        title,
        completed: false,
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    ]);
  };

  console.log(visibleTodos);
  console.log(usersWithTasks);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          if (title.trim() && userSelected !== 0) {
            onAddToDoHandle(userSelected, title);
            setTitle('');
            setUserSelected(0);
          }
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            onChange={eventChangeTitle => {
              setTitle(eventChangeTitle.target.value);
            }}
            placeholder={'Enter a title'}
            value={title}
            type="text"
            data-cy="titleInput"
            id="titleInput"
          />
          {title.length === 0 && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            value={userSelected}
            id="selectUser"
            data-cy="userSelect"
            onChange={event => {
              const selectedId = Number(event.target.value);
              const selectedUser = usersWithTasks.find(
                user => user.id === selectedId,
              );

              if (selectedUser && selectedUser.id !== undefined) {
                setUserSelected(selectedUser.id);
              }
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

          {!userSelected && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
