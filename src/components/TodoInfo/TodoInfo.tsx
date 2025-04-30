import { Todo } from "../../App";

export const TodoInfo = ({ todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={todo.user.email}>
        {todo.user.username}
      </a>
    </article>
  );
};
