import { useState, FormEvent, FC } from 'react';
import { Todo } from '../../types/types';
import { getUserById } from '../../utils/getUserByID';
import usersFromServer from '../../api/users';

interface AddUserProps {
  onAdd: (newTodo: Todo) => void;
  todos: Todo[]; // We need todos to calculate max id
}

export const AddUser: FC<AddUserProps> = ({ onAdd, todos }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const getNextId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  function handleFormReset() {
    setNewTitle('');
    setNewUserId(0);
    setTitleError(false);
    setUserError(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (!newTitle) {
      setTitleError(true);
      hasError = true;
    }

    if (!newUserId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: getNextId(),
      title: newTitle,
      completed: false,
      userId: newUserId,
      user: getUserById(newUserId),
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
            setNewTitle(event.target.value.trimStart());
            if (!event.target.value) {
              setTitleError(true);
            } else {
              setTitleError(false);
            }
          }}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={event => {
            setNewUserId(+event.target.value);
            if (+event.target.value === 0) {
              setUserError(true);
            } else {
              setUserError(false);
            }
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
        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
