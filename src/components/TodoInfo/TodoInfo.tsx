import classNames from "classnames";
import { Todo } from "../../types/Todo";
import { getUserById } from "../../service/user";

type Prop = {
  todo: Todo;
}

export const TodoInfo:React.FC<Prop> = ({ todo}) => (
  <article data-id="1" className={classNames("TodoInfo", {
    "TodoInfo--completed": todo.completed,
  })}>
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <a className="UserInfo" href={`mailto:${getUserById(todo.userId)?.email}`}>
      {getUserById(todo.userId)?.name}
    </a>
  </article>
);


"mailto:Sincere@april.biz"