type Props = {
  email?: string | undefined,
  name?: string | undefined;
};

export const UserInfo: React.FC<Props> = ({ email, name }) => (
  <a className="UserInfo" href={email}>
    {name}
  </a>
);
