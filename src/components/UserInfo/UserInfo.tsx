type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const UserInfo = ({ users }: { users: User[] }) => {
  return (
    <>
      {users.map((user: User) => {
        return (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        );
      })}
    </>
  );
};
