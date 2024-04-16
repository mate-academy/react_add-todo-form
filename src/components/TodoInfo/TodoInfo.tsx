import { TodoInfoProps } from "../../types/TodoInfo";
import { UserInfo } from "../UserInfo";

import cn from "classnames";

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo
}) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo todo={todo} />
    </article>
  );
};
