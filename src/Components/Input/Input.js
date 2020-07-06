import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  state = {
  }

  render() {
    const { value, onChange, name } = this.props;

    return (
      <label>
        <input
          type="text"
          name={name}
          placeholder="What do you want to do ?"
          onChange={({ target }) => onChange(target.name, target.value)}
          value={value}
        />
      </label>
    );
  }
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
};
