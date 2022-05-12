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
    <p className={status ? 'Todo__status Todo__active' : 'Todo__status'}>
      {status ? 'completed' : 'not completed'}
    </p>
    {user && <UserInfo user={user} />}
  </>
);
