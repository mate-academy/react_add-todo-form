type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <span>
      {`Name: ${user.name}`}
      <br />
      {`Email: ${user.email}`}
    </span>
  </>
);
