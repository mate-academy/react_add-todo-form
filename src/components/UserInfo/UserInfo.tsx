import { User } from '../../types/types';

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {user.name}
    </a>
  );
};
