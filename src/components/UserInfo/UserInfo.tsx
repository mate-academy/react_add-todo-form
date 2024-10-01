import React from 'react';

interface UserInfoProps {
  users: {
    id: number;
    name: string;
  }[];
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({ users, selectedUserId, onUserSelect }) => {
  return (
    <div className="field">
      <select data-cy="userSelect" value={selectedUserId} onChange={(e) => onUserSelect(e.target.value)}>
        <option value="" disabled>Choose a user</option>
        {users.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      {selectedUserId === '' && <span className="error">Please choose a user</span>}
    </div>
  );
};
