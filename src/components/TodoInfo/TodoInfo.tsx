import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  userId,
  user,
}) => (
  <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title">{title}</h2>
    <UserInfo key={userId} user={user} />
  </article>
);
