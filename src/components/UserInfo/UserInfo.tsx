import React from "react";
import { ToDo } from "../../types";

type Props = {
  user: ToDo["user"]
}

export const UserInfo: React.FC<Props> = ({
  user
}) => (
  <a className="UserInfo" href={user.email}>
    {user.name}
  </a>
);
