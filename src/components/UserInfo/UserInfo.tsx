import React from 'react';
import usersFromServer from '../../api/users';

type Props = {
  userId: number;
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const currentUser = usersFromServer.find(user => user.id === userId);

  return (
    <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
      {currentUser?.name}
    </a>
  );
};

// тут сноска, тести не проходить так як думає що currentUser може бути undefined
// але навіть коли встановлював за замовчуванням значення ось так
// _______________________
// const currentUser = usersFromServer.find(user => user.id === userId) ?? {
//   id: 0,
//   name: 'Unknown',
//   username: 'unknown',
//   email: 'unknown@example.com',
// };
// _________________________
// то все рівно не проходить тож лишив як є
