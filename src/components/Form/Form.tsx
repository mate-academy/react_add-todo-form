import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/todo';
import { getUserById } from '../../services/getUsers';

type Props = {
  setNewPosts: (todo: Todo) => void;
  todos: Todo[],
};

function getNewId(todoItems: Todo[]) {
  const newId = Math.max(...todoItems.map(todo => todo.id));

  return newId + 1;
}

export const Form: React.FC<Props> = ({ setNewPosts, todos }) => {
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [newPost, setNewPost] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: getUserById(0),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewPost((prevPost: Todo) => ({
      ...prevPost, [name]: value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''),
    }));

    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setNewPost((prevPost: Todo) => ({
      ...prevPost,
      id: getNewId(todos),
      [name]: +value,
      user: getUserById(+value),
    }));

    setHasUserIdError(false);
  };

  const clear = () => (
    setNewPost({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
      user: getUserById(0),
    })
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPost.title.trim()) {
      setHasTitleError(true);
    }

    if (newPost.userId === 0) {
      setHasUserIdError(true);
    }

    if (!newPost.title.trim() || newPost.userId === 0) {
      return;
    }

    setNewPosts(newPost);
    clear();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          name="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={newPost.title}
          onChange={handleChange}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <select
          name="userId"
          data-cy="userSelect"
          value={newPost.userId}
          onChange={handleSelect}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
