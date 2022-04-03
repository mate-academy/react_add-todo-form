import { FC } from 'react';
import './userInfo.scss';

interface Props {
  name: string;
  email: string;
}

export const UserInfo: FC<Props> = ({ name, email }) => (
  <ul>
    <li>
      <span className="keys">Name: </span>
      <span className="values">{name}</span>
    </li>

    <li>
      <span className="keys">Email: </span>
      <span className="values">{email}</span>
    </li>
  </ul>
);
