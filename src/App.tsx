import { useState } from 'react';
import './App.scss';

import users from './api/users';
import { TodoList } from './components/TodoList';
import { Post, Todo, User } from './utils/interface';
import todos from './api/todos';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

function getNewId(posts: Post[]): number {
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const findUsers = (userId: number) => {
    const generalUser = users.find((user: User) => user.id === userId);

    return generalUser;
  };

  const initialPosts: Post[] = todos.map((todo: Todo) => ({
    ...todo,
    user: findUsers(todo.userId)!,
  }));

  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectedUserIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserIdError(false);
  };

  function addPost(newPost: Post) {
    setPosts(initialInfo => [...initialInfo, newPost]);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError(!title.trim());
    setSelectedUserIdError(!selectedUserId);

    if (!title.trim() || !selectedUserId) {
      return;
    }

    const finalUser = users.find(user => user.id === +selectedUserId);

    const newPost: Post = {
      id: getNewId(posts),
      title: title,
      completed: false,
      userId: selectedUserId,
      user: finalUser,
    };

    addPost(newPost);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectedUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList initialPosts={posts} />
    </div>
  );
};
