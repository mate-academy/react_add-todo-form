/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoCard.css';

export const TodoCard = (props) => {
  const { setStatus, todo: { id, completed, title, user } } = props;
  const headingClassnames = classNames('todo__heading', { undone: completed });

  return (
    <div className="todo__card">
      <li>
        <div className="todo__info">
          <label className="todo__title">
            {completed ? (
              <button
                type="button"
                className="todo__button"
                onClick={() => setStatus(id)}
              >
                <span className="todo__button progress">✖</span>
              </button>
            ) : (
              <button
                type="button"
                className="todo__button"
                onClick={() => setStatus(id)}
              >
                <span className="todo__button done">✔</span>
              </button>
            )}

            <h3 className={headingClassnames}>{title}</h3>
          </label>

          <p>by {user.name}</p>
        </div>
      </li>
    </div>
  );
};

TodoCard.propTypes = {
  setStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
