import './App.scss';
import { useState } from 'react';

import { usersFromServer } from './api/users';
import { todosFromServer } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './components/Types/todoType';

function getNewPostId(posts: Todos[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [user, setUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [posts, setPosts] = useState<Todos[]>(todosFromServer);

  const addPost = ({ id, ...data }: Todos) => {
    const newPost: Todos = {
      id: getNewPostId(posts),
      ...data,
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(parseInt(event.target.value));
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(user === 0);

    if (!title || user === 0) {
      return;
    }

    const newPost: Todos = {
      id: getNewPostId(posts),
      title: title,
      userId: user,
      completed: false,
    };

    addPost(newPost);
    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select data-cy="userSelect" value={user} onChange={handleUserChange}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(users => (
              <option key={users.id} value={users.id}>
                {users.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={posts} />
    </div>
  );
};
