type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return user
    ? (
      <a className="UserInfo" href="mailto:Sincere@april.biz">
        {`${user.name} (${user.username})`}
      </a>
    )
    : (
      <p>
        task is not asigned
      </p>
    );
};
