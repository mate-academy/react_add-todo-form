import React from 'react';
import { UserType } from '../../types';

export function User({ name }) {
  return (
    <>
      {`User: ${name}`}
    </>
  );
}

User.propTypes = UserType;
