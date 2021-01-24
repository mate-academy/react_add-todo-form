/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

export class User extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    const { name } = this.props;

    return (
      <>
        {name}
      </>
    );
  }
}
