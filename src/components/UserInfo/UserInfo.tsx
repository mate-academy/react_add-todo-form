import React from "react";
import { UserFromServer } from "../../types";

type Props = {
  user: UserFromServer
};

export const UserInfo: React.FC<Props> = ({
  user,
}) => {
  const {
    email,
    name,
  } = user

  return (
    <a className="UserInfo" href={email}>
      {name}
    </a>
  );
};
