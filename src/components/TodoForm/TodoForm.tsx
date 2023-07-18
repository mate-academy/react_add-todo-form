import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
} from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../getUserById';

type Props = {
  users: User[],
  onAddTodo: (newTodo: Todo) => void,
};

export const TodoForm: FC<Props> = ({ users, onAddTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [option, setOption] = useState<number>(0);
  const [optionError, setOptionError] = useState<boolean>(false);

  const resetForm = () => {
    setTitle('');
    setOption(0);
    setTitleError(false);
    setOptionError(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (option === 0) {
      setOptionError(true);
    }

    if (!title || !option) {
      return;
    }

    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false,
      userId: option,
      user: getUserById(option, users),
    };

    onAddTodo(newTodo);
    resetForm();
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if (titleError === true) {
      setTitleError(false);
    }

    setTitle(event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (optionError === true) {
      setOptionError(false);
    }

    setOption(+event.target.value);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitle}
        />
        {titleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          data-cy="userSelect"
          id="user"
          value={option}
          onChange={handleSelect}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {optionError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
