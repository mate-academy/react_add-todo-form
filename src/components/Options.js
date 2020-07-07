import React from 'react';
import PropTypes from 'prop-types';
import { Option } from './Option';
import { OptionsShape } from '../utils/Shapes';

export const Options = (props) => {
  const { data } = props;

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
};

Options.propTypes = {
  data: PropTypes.arrayOf(OptionsShape).isRequired,
};
