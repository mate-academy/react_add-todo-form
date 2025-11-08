interface UserInfoProps {
  todo: Todo;
}

export const UserInfo: React.FC<UserInfoProps> = ({ todo }) => (
  <a className="UserInfo" href={`mailto:${todo.user.email}`}>
    {todo.user.name}
  </a>
);
