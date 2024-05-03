import { TodoFormProps, User } from '../../types';
import { ChangeEvent, FormEvent, useState } from 'react';
import usersFromServer from '../../api/users';

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedTitleError, setSelectedTitleError] = useState(false);
  const [selectedNameError, setSelectedNameError] = useState(false);

  const users: User[] = [...usersFromServer];

  const getUserById = (userId: number): User | null => {
    return users.find(user => user.id === userId) || null;
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSelectedTitleError(false);
  };

  const handleSelectedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedNameError(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSelectedTitleError(!title);
    setSelectedNameError(!selectedUserId);

    if (!selectedUserId || !title) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {selectedTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          value={selectedUserId}
          onChange={handleSelectedChange}
          data-cy="userSelect"
        >
          <option value={0}>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {selectedNameError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
