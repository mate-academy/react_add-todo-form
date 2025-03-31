import { useState } from 'react';
import users from './../../api/users';

interface UserInfoProps {
  addTask: (title: string, employeeId: number) => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [employeeId, setEmployeeId] = useState(0);

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={e => {
        e.preventDefault();
        if (title === '' || employeeId === 0) {
          return;
        }

        addTask(title, employeeId);
        setTitle('');
        setEmployeeId(0);
      }}
    >
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="titleInput"
          value={title}
          placeholder="Enter Title"
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        {!title && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={employeeId}
          defaultValue={0}
          onChange={e => {
            setEmployeeId(+e.target.value);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {employeeId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
