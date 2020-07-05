import React from 'react';
import PropTypes from 'prop-types';

export class Option extends React.PureComponent {
  render() {
    const { data, id } = this.props;

    return (
      <option value={id}>{data}</option>
    );
  }
}

Option.propTypes = {
  data: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
