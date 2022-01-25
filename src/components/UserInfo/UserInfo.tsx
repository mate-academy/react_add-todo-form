import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h3 className="user__name">{`by ${user.name}`}</h3>
    <span className="user__info">{user.email}</span>
  </>
);
