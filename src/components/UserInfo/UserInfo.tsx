interface Props {
  email: string;
  name: string;
}

export const UserInfo: React.FC<Props> = ({ email, name }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
