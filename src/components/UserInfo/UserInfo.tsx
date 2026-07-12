interface UserInfoProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
