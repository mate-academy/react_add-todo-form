type User = {
  id: number;
  name: string;
  username: string;
  email: string;
} | null;

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
