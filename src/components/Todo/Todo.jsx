
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Todo.scss';

export const Todo = ({ todo, statusToggle }) => {
  const { completed, title, id } = todo;

  return (
    <>
      <div className="tile is-parent">
        <article className={classNames(
          'tile is-child notification  is-light',
          {
            'is-danger': !completed,
            'is-success': completed,
          },
        )}
        >
          <div className="content">
            <p className="title">{title}</p>
            <div className="content" />
          </div>
        </article>
      </div>

      <span className="btn-wrapper">
        <button
          type="button"
          className={classNames(
            'todo__status',
            { 'todo__status--is-completed': completed },
          )}
          value={id}
          onClick={statusToggle}
        />
      </span>
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  statusToggle: PropTypes.func.isRequired,
};
