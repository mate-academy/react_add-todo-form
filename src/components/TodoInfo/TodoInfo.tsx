import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        {todo.user
        && todo.user.name}
      </a>
    </article>
  );
};
