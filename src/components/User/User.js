import React from 'react';
import { UserType } from '../../types';

export function User({ name }) {
  return (
    <span>
      {`User: ${name}`}
    </span>
  );
}

User.propTypes = UserType;
