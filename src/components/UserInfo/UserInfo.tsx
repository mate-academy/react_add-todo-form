export interface IUser {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

export const UserInfo: React.FC<IUser> = ({ user }) => {
  return (
    <div>
      <a className="UserInfo" href={`mailto:${user.email}`} key={user.id}>
        {user.name}
      </a>
    </div>
  );
};
