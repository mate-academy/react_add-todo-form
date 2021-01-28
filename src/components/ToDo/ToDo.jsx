import React from 'react';
import { TodoType } from '../../types';
import './todo.css';

export function ToDo({ title, completed, user }) {
  return (
    <>
      {title}: <p> {completed === true ? 'done' : 'not done'} by {user[0]?.name} </p>
    </>
  );
}

ToDo.propTypes = {
  item: TodoType,
};

ToDo.defaultProps = {
  item: {},
};

