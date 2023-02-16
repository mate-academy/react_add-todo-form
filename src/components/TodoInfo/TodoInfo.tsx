import { UserInfo } from '../UserInfo';
import { User } from '../types/User';

type Props = {
  title: string;
  user: User | null ;
};

export const TodoInfo: React.FC<Props> = ({ title, user }) => {
  return (
    <article
      data-id={user ? user.id : ''}
      className="TodoInfo TodoInfo--completed"
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
