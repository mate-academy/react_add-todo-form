import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UserType } from './Types/UserType';
import { ToDoType } from './Types/ToDoType';
import { useState } from 'react';

const getUser = (userId: number): UserType | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const toDoPlus: ToDoType[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [newToDO, setNewToDo] = useState(toDoPlus);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [noUser, setNoUser] = useState('');
  const [noTitle, setNoTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!title) {
      setNoTitle('Please enter a title');
      isValid = false;
    } else {
      setNoTitle('');
    }

    if (userId === '0') {
      setNoUser('Please choose a user');
      isValid = false;
    } else {
      setNoUser('');
    }

    if (isValid) {
      const ids = newToDO.map(todo => todo.id);
      const maxid = Math.max(...ids);

      const newT = {
        title,
        userId: +userId,
        completed: false,
        id: maxid + 1,
        user: getUser(+userId),
      };

      setNewToDo(prevTodos => [...prevTodos, newT]);
      setTitle('');
      setUserId('0');
    }
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
            placeholder="Enter your title"
            onChange={e => {
              setTitle(e.target.value);
              setNoTitle('');
            }}
          />
          {noTitle && <span className="error">{noTitle}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              setNoUser('');
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

          {noUser && <span className="error">{noUser}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newToDO} />
    </div>
  );
};
