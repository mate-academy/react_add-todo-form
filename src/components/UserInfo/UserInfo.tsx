import { Users } from '../../types/Users';

export const UserInfo = ({ user }: { user: Users }) => {
  return (
    <div className="UserInfo">
      {user.email ? (
        <a href={`mailto:${user.email}`}>
          {user.name}
        </a>
      ) : (
        <span>{user.name}</span>
      )}
    </div>
  );
};
