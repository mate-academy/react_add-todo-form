import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const TodoRow = ({ todo, headers }) => (
  <tr className={cn('table__row')}>
    {headers.map(header => (
      <td key={header.code}>
        {
          todo[header.code].name
            ? todo[header.code].name
            : todo[header.code]
        }
      </td>
    ))}
  </tr>
);

TodoRow.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoRow;
