import { useState } from 'react';
import { User } from '../../types/User';

interface FormInfoProps {
  addTask: (title: string, employeeId: number) => void;
  users: User[];
}

export const FormAddTask: React.FC<FormInfoProps> = ({ addTask, users }) => {
  const [title, setTitle] = useState('');
  const [employeeId, setEmployeeId] = useState(0);
  const [showErrors, setShowErrors] = useState({
    titleError: false,
    userIdError: false,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(filteredValue);

    setShowErrors(prev => ({
      ...prev,
      titleError: filteredValue.trim() === '' ? true : prev.titleError,
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);

    setEmployeeId(selectedId);

    setShowErrors(prev => ({
      ...prev,
      userIdError: selectedId === 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      titleError: title.trim() === '',
      userIdError: employeeId === 0,
    };

    setShowErrors(errors);

    if (!errors.titleError && !errors.userIdError) {
      addTask(title, employeeId);
      setTitle('');
      setEmployeeId(0);
      setShowErrors({ titleError: false, userIdError: false });
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="titleInput"
          value={title}
          placeholder="Enter Title"
          onChange={handleTitleChange}
        />

        {showErrors.titleError && !title && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={employeeId}
          defaultValue={0}
          onChange={handleUserChange}
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
        {showErrors.userIdError && employeeId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
