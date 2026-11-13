import React from "react";

type UserInfoProps = {
  
  user: {
    email: string;
    name: string;
  };
};

export const UserInfo = ({ user }: UserInfoProps) => {

  return (
    <a
        className="UserInfo"
        href={`mailto:${user.email}`}>

        {user.name}
      </a>
  )
};
