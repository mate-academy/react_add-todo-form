import React from 'react';
import { TypeToDo } from '../../types';

export const ToDo = ({ todo: { title, user: { name }, completed } }) => (
  <tr>
    <td>{title}</td>
    <td>{name}</td>
    <td>{completed ? `done` : `in progress`}</td>
  </tr>
);

ToDo.propTypes = {
  todo: TypeToDo.isRequired,
};
