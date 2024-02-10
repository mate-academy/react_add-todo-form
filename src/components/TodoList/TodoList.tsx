import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
  user: User | null;
};

export const TodoList: React.FC<Props> = ({
  onAdd,
  todos,
  user,
}) => {
  const [formState, setFormState] = useState({
    title: '',
    userId: 0,
  });

  const areRequiredFieldsFilled = () => {
    return (
      formState.title !== ''
      && formState.userId !== 0
    );
  };

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(true);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(true);

  const generateNewId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasTitleError || !hasUserIdError) {
      setHasTitleError(false);
      setHasUserIdError(false);
    }

    onAdd({
      id: generateNewId(),
      title: formState.title,
      completed: false,
      userId,
    });
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Please enter a title"
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>

        </div>
        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(currentUser => (
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={areRequiredFieldsFilled()}
        >
          Add
        </button>
      </form>
      <section className="TodoList">
        {todos.map(todo => (
          <article data-id="1" className="TodoInfo TodoInfo--completed">
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>
            <a
              className="UserInfo"
              href="mailto:Sincere@april.biz"
            >
              {user}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
