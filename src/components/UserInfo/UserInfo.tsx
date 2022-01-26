type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <div>
      <span>{user.name}</span>
      {' - '}
      <span>{user.email}</span>
    </div>
  )
);
