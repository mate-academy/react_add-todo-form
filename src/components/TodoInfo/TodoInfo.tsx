import cn from 'classnames';
import { TodoAggregated } from '../../domain/TodoAggreaged';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: TodoAggregated;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

{
  /* <article data-id="1" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">delectus aut autem</h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article> */
}
