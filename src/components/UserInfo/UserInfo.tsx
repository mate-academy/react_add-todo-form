import usersFromServer from '../../api/users'

type User = (typeof usersFromServer)[number];

type Props = {
  user: User;
}

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
