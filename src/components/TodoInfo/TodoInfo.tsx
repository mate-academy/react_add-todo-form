import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

export const TodoInfo = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn(`TodoInfo`, { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
