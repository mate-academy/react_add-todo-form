import { useState } from 'react';
import './App.scss';

import { Todo } from './type/todo';
import { User } from './type/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const getMaxId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [errorUserId, setErrorUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  function addPost(newPost: Todo): void {
    setTodos(prevTodos => [
      ...prevTodos,
      { ...newPost, id: getMaxId(todos) + 1 },
    ]);
  }

  function handleOnChangeUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUser(getUserById(+event.target.value));
    setErrorUserId('');
  }

  function handleOnChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setErrorTitle('');
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newTitle = title.trim();

    if (!newTitle) {
      setErrorTitle('Please enter a title');
    }

    if (!user) {
      setErrorUserId('Please choose a user');
    }

    if (newTitle && user) {
      addPost({
        id: 0,
        title: newTitle.replaceAll(/[^a-z0-9а-яіїєґ\s]/gi, ''),
        completed: false,
        userId: user.id,
        user,
      });
      setTitle('');
      setUser(null);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleOnChangeTitle}
          />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user?.id || 0}
            onChange={handleOnChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(currentUser => (
              <option value={currentUser.id} key={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {errorUserId && <span className="error">{errorUserId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
