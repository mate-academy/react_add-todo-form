export interface User {
  id: number,
  name: string,
  email: string,
  username: string,
}

export const UserInfo = ({ user }: { user: User }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
