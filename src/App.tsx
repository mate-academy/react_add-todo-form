import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [chosenUser, setChosenUser] = useState(0);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const reset = () => {
    setTitle('');
    setChosenUser(0);
    setTitleErrorMessage('');
    setUserErrorMessage('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!chosenUser) {
      setUserErrorMessage('Please choose a user');
    }

    if (!chosenUser || !title) {
      return;
    }

    reset();
    setTodos(prevState => {
      const id = Math.max(...prevState.map(todo => todo.id)) + 1;

      const newTodo: Todo = {
        id,
        title,
        userId: chosenUser,
        completed: false,
      };

      return [...prevState, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleErrorMessage('');
              }}
            />
          </label>

          <span className="error">{titleErrorMessage}</span>
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={chosenUser}
              onChange={event => {
                setChosenUser(+event.target.value);
                setUserErrorMessage('');
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          <span className="error">{userErrorMessage}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
