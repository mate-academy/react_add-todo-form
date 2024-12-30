import React from "react";
import { todo} from "../types";
import classNames from "classnames";
import { UserInfo } from "../UserInfo";

type Props = {
  todo: todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
 
  return (
    <article
      data-id={todo.id}
      className={classNames("TodoInfo", { "TodoInfo--completed": todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <p className="TodoInfo__no-user">User not found</p>
      )}
    </article>
  );
};
