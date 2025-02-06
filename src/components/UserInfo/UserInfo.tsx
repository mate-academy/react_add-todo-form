import { TodoWithUser } from '../../types';
import './styles.scss';

type Props = {
  user: TodoWithUser['user'];
};
export const UserInfo = ({ user }: Props) => {
  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {`${user.name}`}
        </a>
      )}
    </>
  );
};
