import { User } from '../../interfaces/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
