import React from 'react';
import './Header.css';
import { usersType } from '../../types/types';

export const Header = ({ todoArr }) => (
  <h1>
    <span>TASKS: </span>
    {todoArr.length}
  </h1>
);

Header.propTypes = {
  todoArr: usersType.isRequired,
};
