
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Todo.scss';

export const Todo = ({ todo, statusToggle }) => {
  const { completed, title, id } = todo;

  return (
    <>
      <p className={classNames(
        'todo__title',
        { 'todo__title--is-completed': completed },
      )}
      >
        {title}
      </p>

      <button
        type="button"
        className={classNames(
          'todo__status',
          { 'todo__status--is-completed': completed },
        )}
        value={id}
        onClick={statusToggle}
      />
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  statusToggle: PropTypes.func.isRequired,
};
