import { useState } from 'react';
import './App.scss';

import { FormHelperText } from '@mui/material';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './type/User';
import { Todos } from './type/Todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleCorrect, setTitleCorrect] = useState(true);
  const [userIdCorrect, setUserIdCorrect] = useState(true);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleCorrect(true);
  };

  const changeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserIdCorrect(true);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title) {
      setTitleCorrect(true);
    } else {
      setTitleCorrect(false);
    }

    if (userId) {
      setUserIdCorrect(true);
    } else {
      setUserIdCorrect(false);
    }

    if (userId && title) {
      const id = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todos = {
        title,
        userId: +userId,
        completed: false,
        id: id + 1,
        user: getUserById(+userId),
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeTitle}
          />

          {!titleCorrect && (
            <FormHelperText>Please enter a title</FormHelperText>
          )}
        </div>

        <div className="field">
          User:
          <select data-cy="userSelect" onChange={changeUserId}>
            <option>
              Choose a user
            </option>

            {usersFromServer.map((person) => (
              <option
                value={person.id}
                key={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>

          {!userIdCorrect && (
            <FormHelperText>Please choose a user</FormHelperText>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
