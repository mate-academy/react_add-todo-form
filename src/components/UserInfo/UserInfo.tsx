export type User = {
  email: string;
  name: string;
  id: number;
};

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
