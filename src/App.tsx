import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UserMas } from './interfaces/UserMas';
import { TodosMas } from './interfaces/TodosMas';
import { TodoList } from './components/TodoList';

function getTodos(todoUserId: number): UserMas | undefined {
  return usersFromServer.find(user => user.id === todoUserId);
}

function getNewPostId(posts: TodosMas[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [isUserId, setIsUserId] = useState(0);
  const [isUserError, setIsUserError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserId(+event.target.value);
    setIsUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const [posts, setPosts] = useState<TodosMas[]>(todosFromServer);

  const visibleArray = posts.map(todo => ({
    ...todo,
    user: getTodos(todo.userId),
  }));

  const reset = () => {
    setTitle('');
    setIsUserId(0);
  };

  const addPost = (newTitle: string, newUserId: number) => {
    setPosts(currentPosts => [
      ...currentPosts,
      {
        id: getNewPostId(posts),
        title: newTitle,
        completed: false,
        userId: newUserId,
      },
    ]);

    reset();
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isUserId === 0) {
      setIsUserError(true);
    }

    if (title === '') {
      setIsTitleError(true);
    }

    if (title === '' || isUserId === 0) {
      return;
    }

    addPost(title, isUserId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={isUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleArray} />
    </div>
  );
};
