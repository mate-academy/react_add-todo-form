import React from 'react';
import PropTypes from 'prop-types';
import { Options } from './Options';
import { OptionsShape } from '../utils/Shapes';

export class Select extends React.PureComponent {
  render() {
    const { onChange, selectValue, options, onActive } = this.props;

    return (
      <select
        className="select"
        name="select"
        value={selectValue}
        onChange={(event) => {
          onChange(event.target.value);
          onActive(event.target);
        }}
      >
        <option value="0" disabled>Choose a manager</option>
        <Options data={options} />
      </select>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(OptionsShape).isRequired,
  onChange: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
};
