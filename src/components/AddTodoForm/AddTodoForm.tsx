import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUserById } from '../../services/UserService';

type Props = {
  users: User[],
  onTodoCreated: (newTodo: Todo) => void,
};

export const AddTodoForm: React.FC<Props> = ({
  users,
  onTodoCreated,
}) => {
  const initialNewTodo: Todo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: undefined,
  };

  const titleRegex = new RegExp(/([^а-щьюяґєії'|^a-z|^\d|^ +])/ig);

  const [newTodo, setNewTodo] = useState<Todo>(initialNewTodo);
  const [isTitleErrorShown, setIsTitleErrorShown] = useState(false);
  const [isUserErrorShown, setIsUserErrorShown] = useState(false);

  const normalizeTitle = (title: string) => {
    return title.replace(titleRegex, '');
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId: number = +event.target.value;

    setIsUserErrorShown(false);

    setNewTodo({
      ...newTodo,
      user: getUserById(newUserId, users),
      userId: newUserId,
    });
  };

  const handleTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitleErrorShown(false);

    setNewTodo({
      ...newTodo,
      title: normalizeTitle(event.target.value),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsUserErrorShown(!newTodo.user);
    setIsTitleErrorShown(!newTodo.title);

    if (!newTodo.user || !newTodo.title) {
      return;
    }

    onTodoCreated(newTodo);

    setNewTodo(initialNewTodo);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={newTodo.title}
          placeholder="Enter title"
          onChange={(event) => handleTitleChanged(event)}
        />
        {isTitleErrorShown
          && (<span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={newTodo.userId}
          onChange={(event) => handleUserSelect(event)}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {isUserErrorShown
          && (<span className="error">Please choose a user</span>)}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
