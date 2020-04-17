import React from 'react';
import './Header.css';
import { usersType } from '../../types/types';

export function Header({ todoArr }) {
  return (
    <h1>
      <span>TASKS: </span>
      {todoArr.length}
    </h1>
  );
}

Header.propTypes = {
  todoArr: usersType.isRequired,
};
