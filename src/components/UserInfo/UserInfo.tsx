export interface User {
  id: number,
  name: string,
  email: string,
  username: string,
}

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
