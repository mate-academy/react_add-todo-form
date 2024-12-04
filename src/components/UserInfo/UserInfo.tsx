import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = props => {
  const { user } = props;

  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {user.name}
    </a>
  );
};
