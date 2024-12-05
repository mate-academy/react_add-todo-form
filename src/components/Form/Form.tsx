import { useState } from 'react';
import { Todo, User } from '../../types';

import { InputTitle } from './InputTitle';
import { SelectUser } from './SelectUser';
import { getNewId } from '../../utils/getNewId';

type Props = {
  users: User[];
  todos: Todo[];
  onAddTodo: (todo: Todo) => void;
};

export const Form: React.FC<Props> = ({ users, todos, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHesTitleError] = useState(false);
  const [hasUserIdError, setHesUserIdError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHesTitleError(false);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHesUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHesTitleError(title === '');
    setHesUserIdError(userId === 0);

    if (title && userId) {
      const todo: Todo = {
        title,
        id: getNewId(todos),
        completed: false,
        userId,
        user: users.find(user => userId === user.id),
      };

      onAddTodo(todo);
      setTitle('');
      setUserId(0);
      setHesTitleError(false);
      setHesUserIdError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <InputTitle
        title={title}
        onChange={onTitleChange}
        hasError={hasTitleError}
      />

      <SelectUser
        userId={userId}
        onChange={onUserIdChange}
        hasError={hasUserIdError}
        users={users}
      />

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
