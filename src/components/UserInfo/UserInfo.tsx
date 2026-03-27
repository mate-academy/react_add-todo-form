type Props = {
  user?: {
    name: string;
    email: string;
  };
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <p className="UserInfo">{user.name}</p>

      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
