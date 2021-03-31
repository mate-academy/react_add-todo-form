import React from 'react';
import PropTypes from 'prop-types';
import './TaskStatus.scss';

export const TaskStatus = ({ status }) => (
  status
    ? <span className="completed">completed</span>
    : <span className="not-completed">not completed</span>
);

TaskStatus.propTypes = {
  status: PropTypes.bool.isRequired,
};
