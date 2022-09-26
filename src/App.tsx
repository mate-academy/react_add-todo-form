import './App.scss';

import {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [userName, setUserName] = useState('0');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [displayName, setDisplayName] = useState(true);
  const [displayTitle, setDisplayTitle] = useState(true);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setDisplayName(true);
    setUserName(value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDisplayTitle(true);
    setTitle(value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, ''));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const userId = usersFromServer.find(user => userName === user.name)?.id;

    if (title.trim() !== '' && userName !== '0') {
      const todoObj = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: userId || 0,
        user: getUser(userId || 0),
      };

      setTodos(oldState => {
        return [...oldState, todoObj];
      });

      setUserName('0');
      setTitle('');
    }

    setDisplayTitle(title.trim() !== '');
    setDisplayName(userName !== '0');
  };

  useEffect(() => {
    setTodos(oldState => {
      return oldState.map(state => ({ ...state, user: getUser(state.userId) }));
    });
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter the title"
            onChange={handleTitleChange}
          />
          {(!title.trim() && !displayTitle)
          && (<span className="error">Please enter a title</span>)}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.name} key={user.id}>{user.name}</option>))}
          </select>
          {(userName === '0' && !displayName)
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
