import { User } from '../../types/User';

type Props = {
  user: User,
};

export const OptionInfo: React.FC<Props> = ({ user }) => {
  const { id, name } = user;

  return (
    <option
      value={String(id)}
    >
      {name}
    </option>
  );
};
