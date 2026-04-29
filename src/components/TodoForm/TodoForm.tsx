import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
};

export const TodoForm = ({ onAdd, todos }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  function handleSubmit() {
    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (!title || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const newId = maxId + 1;
    const newTodo = {
      id: newId,
      title: title,
      completed: false,
      userId: userId,
      user: usersFromServer.find(user => user.id === userId),
    };

    onAdd(newTodo);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  }

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError('');
          }}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(+event.target.value);
            setUserError('');
          }}
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
