import { IUser } from '../../types/user';

type Props = {
  user: IUser
};

export const UserInfo: React.FC<Props> = ({
  user: {
    email,
    name,
  },
}) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${email}`}
    >
      {name}
    </a>
  );
};
