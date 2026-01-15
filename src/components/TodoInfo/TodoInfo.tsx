import { UserInfo } from "../UserInfo";
import React from "react";

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {


  return (
    <>
    <article data-id="1" className={`TodoInfo ${todo.completed === true ? "TodoInfo--completed" : ''}`}>
        <h2 className="TodoInfo__title">{todo.title}</h2>
        {todo.user && <UserInfo user={todo.user} />}
        </article>
  </>
  )
};
