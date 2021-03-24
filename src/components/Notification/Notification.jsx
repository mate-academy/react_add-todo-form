import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

export const Notification = ({ notify }) => (
  <div className="notification">
    <span className="notification__text">{notify}</span>
  </div>
);

Notification.propTypes = PropTypes.string.isRequired;
