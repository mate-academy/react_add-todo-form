import './userInfo.scss';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <div className="user">
      <span className="user__name">{`${user.name}. `}</span>
      <span className="user__email">{`Email: ${user.email}`}</span>
    </div>
  )
);
