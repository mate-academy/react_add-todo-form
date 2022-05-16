import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  title: string;
  status: boolean;
  user?: User;
};

export const TodoInfo: React.FC<Props> = ({ title, status, user }) => (
  <>
    <h2 className="Todo__title">{title}</h2>

    <p className={`Todo__status ${status
      ? 'Todo__status--completed'
      : 'Todo__status--not_completed'}`}
    >
      {status ? 'completed' : 'not completed'}
    </p>
    {user && <UserInfo user={user} />}
  </>
);
