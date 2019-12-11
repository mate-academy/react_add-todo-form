import React from 'react';
import PropTypes from 'prop-types';

const List = ({ todoList }) => (
  <div className="position_List">
    <div className="taskList">
      <ul className="ul">
        {todoList.map(item => (
          <li>
            <span className="span"> Task:</span>
            {item.title}
            <p>
              {' '}
              <span className="span">Person:</span>
              {item.user.name}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

List.propTypes = { todoList: PropTypes.arrayOf(PropTypes.object).isRequired };

export default List;
