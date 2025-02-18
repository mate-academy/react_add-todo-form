import React from 'react';



interface UserInfo{
  user : User
}

export const UserInfo : React.FC<UserInfo> = ({user}) => {


  return (

    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>


  );
};
