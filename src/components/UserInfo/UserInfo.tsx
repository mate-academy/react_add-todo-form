import { User } from '../../types';

type Props = {
  user: User[];
};

export const UserInfo = ({ user }: Props) => {
  return (
    <>
      {user.map(userItem => (
        <option value={userItem.id} key={userItem.id}>
          {userItem.name}
        </option>
      ))}
    </>
  );
};
