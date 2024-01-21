import { useState } from 'react';
import { User } from '../../types/User';

interface Props {
  users: User[];
  addTodo: (title: string, userId: number) => void;
}

export const AddTodoForm = (props: Props) => {
  const { users, addTodo } = props;

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const [showErrors, setShowErrors] = useState(false);

  function resetForm() {
    setSelectedUser(null);
    setNewTitle('');
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!showErrors) {
      setShowErrors(true);
    }

    if (selectedUser && newTitle.trim()) {
      addTodo(newTitle, selectedUser);
      resetForm();
      setShowErrors(false);
    }
  }

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
            <input
              id="titleInput"
              type="text"
              data-cy="titleInput"
              value={newTitle}
              placeholder="Enter a title"
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </label>
          {(!newTitle && showErrors) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              name="userSelect"
              data-cy="userSelect"
              value={selectedUser !== null ? selectedUser : 0}
              onChange={(event) => setSelectedUser(+event.target.value)}
            >
              <option value="0" key={0} disabled>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {(!selectedUser && showErrors) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
