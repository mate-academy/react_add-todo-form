import { User } from '../../types/types.model';

interface IProps {
  user: User;
}

export const UserInfo: React.FC<IProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
