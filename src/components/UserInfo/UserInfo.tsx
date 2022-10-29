type Props = {
  email: string;
  name: string;
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <a className="UserInfo" href={email}>
    { name }
  </a>
);
