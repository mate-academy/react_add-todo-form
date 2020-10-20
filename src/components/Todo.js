import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export function Todo({ id, title, name }) {

  return (
    <>
      <span className="todo-title">{title}</span>
      <p>
        Id:
        {id}
        <p>
          <User name={name} />
        </p>
      </p>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
