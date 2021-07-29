import React from 'react';
import Proptypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export const TodosList = ({ list }) => {
  const header = ['id', 'user', 'title', 'status'];

  return (
    <table className="table" border={1} cellPadding={5}>
      <thead className="theadDark">
        <tr>
          {header.map(title => (
            <th key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {list.map(item => (
          <tr key={uuidv4()}>
            <td>{item.id}</td>
            <td>{item.user}</td>
            <td>{item.title}</td>
            <td>
              {item.completed
                ? 'Done'
                : 'In process'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TodosList.propTypes = {
  list: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.number.isRequired,
      title: Proptypes.string.isRequired,
      user: Proptypes.string.isRequired,
      completed: Proptypes.bool,
    }).isRequired,
  ).isRequired,
};
