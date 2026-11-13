import React from "react";
import { UserInfo } from "../UserInfo";

type TodoInfoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      email: string;
      name: string;
    };
  };
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={'TodoInfo '
        + (todo.completed === true
        ? 'TodoInfo--completed'
        : '')}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
