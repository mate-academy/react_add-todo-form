import React from 'react';
import { User } from '../../types/Todo';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <article>
    <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
      {user.name}
    </a>
  </article>
);
