import React from "react";
import { Todo } from "../../types";

type Props = {
  user: Todo["user"]
};

export const UserInfo: React.FC<Props> = ({
  user,
}) => (
  <a className="UserInfo" href={user?.email}>
    {user?.name}
  </a>
);
