import React from 'react';
import PropTypes from 'prop-types';

const TableHeaders = ({ headers }) => (
  <>
    {headers.map(header => (
      <th key={header.code}>
        {header.label}
      </th>
    ))}
  </>
);

TableHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableHeaders;
