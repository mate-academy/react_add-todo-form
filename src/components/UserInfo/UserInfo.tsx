import { User } from '../../App';

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => (
  <>
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  </>
);
