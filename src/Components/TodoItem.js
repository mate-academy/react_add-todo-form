import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import './TodoItem.scss';

const TodoItem = ({ todo }) => {
  const { title, user, completed, id } = todo;

  return (

    <div className="user">
      <p>
        Todo №
        {id}
      </p>
      <p className="user__name">
        <User {...user} />
      </p>
      <p className="user__title">
        <strong>Title :</strong>
        {title}
      </p>
      <p>
        <strong>Status:</strong>
        {completed
          ? <span className="user__completed-true">done</span>
          : <span className="user__completed-false">in procces</span>
        }
      </p>

      <p className="user__id">
        <strong>User id: </strong>
        {user.id}
      </p>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
