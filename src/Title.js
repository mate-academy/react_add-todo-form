import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ item }) => {
  const { title } = item;

  return (
    <p>
      {title}
    </p>
  );
};

Title.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Title;
