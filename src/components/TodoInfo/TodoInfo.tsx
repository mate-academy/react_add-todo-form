import classNames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo = ({ todo } : Props) => {
  const {
    title, user, id, completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      { user && <UserInfo user={user} /> }
    </article>
  );
};
