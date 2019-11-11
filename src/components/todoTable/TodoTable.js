import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TodoRow from '../todoRow/TodoRow';

const TodoTable = ({ todos }) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign='center'>Id</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>User</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Todo</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {todos.map(todo => <TodoRow id={todo.id} name={todo.user.name} title={todo.title}/>)}
    </Table.Body>
  </Table>
);

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoTable;
