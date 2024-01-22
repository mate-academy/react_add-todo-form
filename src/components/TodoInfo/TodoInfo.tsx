import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { ToDoWithUserProps } from '../types';

export const TodoInfo: React.FC<ToDoWithUserProps> = (
  { todo },
) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
