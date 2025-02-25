type TodoUserProps = {
  name: string;
  email: string;
};

export const UserInfo: React.FC<TodoUserProps> = ({ name, email }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
