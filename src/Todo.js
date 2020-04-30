import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Todo = ({ title, user, userId, id }) => (
  <ul className="list">
    <li className="list__userInfo">
      <h4>
        Title:
        &nbsp;
        {title}
      </h4>
      <h5>
        TODOs id:&nbsp;
        {id}
      </h5>
      <h5>
        User Id:
        &nbsp;
        {userId}
      </h5>
      <User {...user} />
    </li>
  </ul>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object]).isRequired).isRequired,
};

export default Todo;
