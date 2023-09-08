import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import './App.scss';
import { getUserById } from './services/user';
import { TodoWithUser } from './types/types';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId)
  || null,
})) as TodoWithUser[];

export const App = () => {
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [posts, setPosts] = useState<TodoWithUser[]>(todos);

  const addPost = (post: TodoWithUser) => {
    setPosts([...posts, post]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newPost: TodoWithUser = {
      id: posts.length + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId) || {
        id: 0,
        name: '',
        username: '',
        email: '',
      },
    };

    addPost(newPost);
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
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            id="title"
            data-cy="titleInput"
            defaultValue="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                  data-cy="userSelect"
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
