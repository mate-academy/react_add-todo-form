import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function findUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => (
  { ...todo, user: findUserById(todo.userId) }
));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTtitleError] = useState(false);
  const [userSelected, setUserSelected] = useState('0');
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserSelected('0');
    setTtitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '' || userSelected === '0') {
      setTtitleError(title.trim() === '');
      setUserError(userSelected === '0');

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(item => item.id)) + 1,
      title,
      completed: false,
      userId: +userSelected,
      user: findUserById(+userSelected),
    };

    const newTodos = [...todos, newTodo];

    setTodos(newTodos);

    reset();
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTtitleError(false);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(e.target.value);
    setUserError(false);
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
          <label htmlFor="#title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="#title"
            value={title}
            onChange={handleTitle}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="#user">User: </label>
          <select
            data-cy="userSelect"
            id="#user"
            value={userSelected}
            onChange={handleSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user, index) => (
              <option value={index + 1} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
