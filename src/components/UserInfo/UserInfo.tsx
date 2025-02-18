export interface User {
  name: string;
  email: string;
  id: number;
  username: string;
}

export const UserInfo = ({ user }: { user: User }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
