import { User } from '../../types';

type Props = {
  user: User
};

export const UserInfo = (props: Props) => {
  const { user } = props;

  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {user.name}
    </a>
  );
};
