import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { User } from '../../Types/User';

import './TodoInfo.scss';

type Props = {
  todo: {
    user: User | null;
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed, id } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
