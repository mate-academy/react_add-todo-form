import React from 'react';
import { TypeUser } from '../../types';
import './User.scss';

export const User = ({ name, id }) => (
  <>
    {`user: `}
    <span className="user__name">{name}</span>
    {/* <br /> */}
    {` id: ${id}`}
  </>
);

User.propTypes = TypeUser;
