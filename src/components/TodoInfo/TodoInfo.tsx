import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../types';
import './TodoInfo.scss';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
