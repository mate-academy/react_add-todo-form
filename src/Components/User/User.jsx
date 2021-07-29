import React from 'react';
import { PreparedTodosType } from '../../types/PreparedTodosTypes';
// import './User.css';

export const User = ({ task }) => (
  <p className="card-subtitle mb-2 text-muted">{task.user}</p>
);

User.propTypes = PreparedTodosType.isRequired;
