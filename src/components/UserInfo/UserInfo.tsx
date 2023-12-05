import { User } from '../../types';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;
  const { name, email } = user;

  return (
    <a
      className="UserInfo"
      href={`mailto:${email}`}
    >
      {name}
    </a>
  );
};
