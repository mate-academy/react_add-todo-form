interface Props {
  user: {
    name: string;
    email: string;
  };
  completed: boolean;
}

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
