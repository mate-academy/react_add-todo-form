import users from '../../api/users';

interface Props {
  title: string,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

function getUserById(arr: User[], id: number) {
  return arr.find(item => item.id === id);
}

export const TodoInfo: React.FC<Props> = ({ title, userId }) => {
  const user = getUserById(users, userId);
  const email = user?.email;
  const name = user?.name;

  return (
    <>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    </>
  );
};
