import React from 'react';

type Props = {
  name: string
  email: string
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <p className="task__info">
    <h3>
      {name}
    </h3>

    <a href={`mailto:${email}`}>
      {email}
    </a>
  </p>
);
