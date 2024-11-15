import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

export const TodoInfo: React.FC<Props> = ({ id, title, completed, user }) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <a className="UserInfo" href={`mailto:${user?.email}`}>
          {user?.name}
        </a>
      )}
    </article>
  );
};
