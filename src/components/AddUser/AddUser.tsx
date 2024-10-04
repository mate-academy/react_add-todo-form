import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { FC, useState, FormEvent } from 'react';
import { findUserById } from '../../utils/FindUserById';

interface Props {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
}

export const AddUser: FC<Props> = ({ onAdd, todos }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function handleFormReset() {
    setNewTitle('');
    setNewUserId(0);
    setTitleError('');
    setUserError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle) {
      setTitleError('Please enter a title');
    }

    if (!newUserId) {
      setUserError('Please choose a user');
    }

    if (!newTitle || !newUserId) {
      return;
    }

    const newTodo: Todo = {
      id: todos[todos.length - 1].id + 1,
      title: newTitle,
      completed: false,
      userId: newUserId,
      user: findUserById(newUserId),
    };

    onAdd(newTodo);

    handleFormReset();
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={newTitle}
          placeholder="Some task"
          onChange={event => {
            setTitleError('');
            setNewTitle(event.target.value.trimStart());
          }}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={event => {
            setUserError('');
            setNewUserId(+event.target.value);
          }}
          value={newUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
