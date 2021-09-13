import React from 'react';

interface Props {
  users: User[];
}
export const SelectUser: React.FC<Props> = (props) => {
  const { users } = props;

  return (
    <>
      <option value="">
        Choose a user
      </option>
      {users.map((user: User) => (
        <option value={user.name} key={user.id}>
          {user.name}
        </option>
      ))}
    </>
  );
};
