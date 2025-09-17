import { Todo } from '../../types/Todo';

type Props = {
  user: NonNullable<Todo['user']>;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
