import { User } from '../../types';

type Props = {
  user: User;
};

// Exibe o nome do usuário como link mailto para o email
export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
