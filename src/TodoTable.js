import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TableHeaders from './TableHeaders';
import TodoRow from './TodoRow';

const TodoTable = ({ todos }) => {
  const tableHeaders = [
    {
      code: 'id', label: 'Id',
    },
    {
      code: 'title', label: 'Title',
    },
    {
      code: 'user', label: 'User',
    },
  ];

  return (
    <table className={cn('App__table', 'table')}>
      <thead>
        <tr className={cn('table__head')}>
          <TableHeaders headers={tableHeaders} />
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoRow
            key={todo.id}
            todo={todo}
            headers={tableHeaders}
          />
        ))}
      </tbody>
    </table>
  );
};

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoTable;
