type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface UsersProps {
  users: UsersItem[];
  neededId: number;
}

export const UserInfo: React.FC<UsersProps> = ({ users, neededId }) => {
  const user = users.find(item => item.id === neededId);

  return (
    <>
      {user && (
        <a className="UserInfo" href={user.email}>
          {user.name}
        </a>
      )}
    </>
  );
};
