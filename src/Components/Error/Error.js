import React from 'react';
import PropTypes from 'prop-types';
import styles from './Error.module.css';

export const Error = ({ message }) => (
  <div>
    <p className={styles.message}>{message}</p>
  </div>
);

Error.defaultProps = {
  message: '',
};

Error.propTypes = {
  message: PropTypes.string,
};
