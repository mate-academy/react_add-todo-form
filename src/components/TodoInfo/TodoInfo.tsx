import cn from 'classnames';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}

      {/* <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a> */}
    </article>
  );
};
