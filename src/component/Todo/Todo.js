import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ user, title, completed, id }) => {
  const status = (completed === true || completed === 'Done')
    ? <div className="item__status"> Done </div>
    : <div className="item__status_active"> Not ready </div>;

  return (

    <div className="todo__item item">
      <div>
        #
        {id}
      </div>
      {status}
      <div>
        Title of todo:
        { title}
      </div>
      <div>
        Performer:
        {user.name}
      </div>
    </div>
  );
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
