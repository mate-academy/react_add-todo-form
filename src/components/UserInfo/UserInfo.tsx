import React from "react";
import Users from "../../types/Users";

interface Props {
  user: Users | null
}

export const UserInfo:React.FC<Props> = ({ user }) => {
  return(
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  )
};

