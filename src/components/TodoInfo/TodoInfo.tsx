import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/types';

type Prop = {
  todo: ToDo;
};

export const TodoInfo:React.FC<Prop> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
