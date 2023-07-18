import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUser, setselectedUser] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title && title.trim() === '' && selectedUser === '0') {
      setTitleError(true);
      setUserError(true);

      return;
    }

    if (!title) {
      setTitleError(true);

      return;
    }

    if (selectedUser === '0') {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todosList.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: +selectedUser,
      user: getUserById(+selectedUser),
    };

    setTodosList(currentList => [...currentList, newTodo]);
    setTitle('');
    setselectedUser('0');
    setTitleError(false);
    setUserError(false);
  }

  function handleTitle(e:React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setTitleError(false);
  }

  function handleSelect(e:React.ChangeEvent<HTMLSelectElement>) {
    setselectedUser(e.target.value);
    setUserError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Enter title"
            data-cy="titleInput"
            onChange={handleTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelection">User: </label>
          <select
            id="userSelection"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              return <option key={user.id} value={user.id}>{user.name}</option>;
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
