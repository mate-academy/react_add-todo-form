import React from 'react';
import PropTypes from 'prop-types';
import { Option } from './Option';
import { OptionsShape } from '../utils/Shapes';

export class Options extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <>
        {data.map(({ name, id }) => (
          <Option
            key={id}
            data={name}
            id={id}
          />
        ))}
      </>
    );
  }
}

Options.propTypes = {
  data: PropTypes.arrayOf(OptionsShape).isRequired,
};
