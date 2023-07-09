import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type Post = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

const getPostId = (posts: Post[]) => {
  const maxIdPost = posts.sort((post1, post2) => post2.id - post1.id);

  return maxIdPost[0].id + 1;
};

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Post[]>(todosFromServer);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);
  const [select, setSelect] = useState<number>(0);
  const [postId, setPostId] = useState<number>(getPostId(todosFromServer));

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setSelect(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || select === 0) {
      setTitleError(!title);
      setUserError(select === 0);

      return;
    }

    setPostId(postId + 1);

    setTodos(prevState => [
      ...prevState, {
        id: postId,
        title,
        completed: false,
        userId: select,
      }]);

    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={postId}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => handleTitle(event)}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            defaultValue={0}
            required
            onChange={event => handleSelect(event)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList
        todos={todos}
      />
    </div>
  );
};
