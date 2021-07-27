import React from 'react';
import PropTypes from 'prop-types';

export const ListItem = ({ user, toDo, progress }) => (
  <>
    <p className="todo__user">{user}</p>
    <p>{toDo}</p>
    <p className="todo__status">
      Status:
      {progress ? ' Completed' : ' In progress'}
    </p>
  </>
);

ListItem.propTypes = {
  user: PropTypes.string.isRequired,
  toDo: PropTypes.string.isRequired,
};
