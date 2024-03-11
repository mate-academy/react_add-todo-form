type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface UsersInfoProps {
  users: UsersItem[];
  neededId: number;
}

export const UserInfo: React.FC<UsersInfoProps> = ({ users, neededId }) => {
  const user = users.find(item => item.id === neededId);

  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </>
  );
};
