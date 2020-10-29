import React from 'react';
import { UserProps } from '../../props/UserProps';

export const User = ({ name }) => (
  <span>{ name }</span>
);

User.propTypes = UserProps;
