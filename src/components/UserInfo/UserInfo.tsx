import React from 'react';
import { Person } from '../../type';

type Props = {
  person: Person,
};

export const UserInfo: React.FC<Props> = ({ person }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${person.email}`}
    >
      {person.name}
    </a>
  );
};
