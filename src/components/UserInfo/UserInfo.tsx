import { TodoWithUserProps } from '../../types';

export const UserInfo = ({ user }: { user: TodoWithUserProps['user'] }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
      data-cy="UserInfoEmail"
    >
      {user.name}
    </a>
  );
};
