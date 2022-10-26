import React from 'react';
// import './UserInfo.cscc';
import usersFromServer from '../../api/users';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = usersFromServer.find(el => el.id === userId);
  // console.log(user)
  // const getUser = (userId) => {
  //   usersFromServer.find(user => {

  //   })

  // }

  return (
    <>
      {user
        && (
          <a className="UserInfo" href={`mailto:${user.email}`}>
            {user.name}
          </a>
        )}
    </>
  );
};
