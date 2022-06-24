import classNames from 'classnames';
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
    <p className={classNames('Todo__status', { Todo__active: status })}>
      {status ? 'completed' : 'not completed'}
    </p>

    {status && (
      <img
        src="https://cdn-icons-png.flaticon.com/512/5930/5930432.png"
        width="20px"
        alt="icon completed"
      />
    )}

    {user && <UserInfo user={user} />}
  </>
);
