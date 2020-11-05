import React from 'react';
import { Table } from 'semantic-ui-react';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';

const TodoItem = ({ title, completed, user }) => (
  <Table.Row warning>
    <Table.Cell>{user.name}</Table.Cell>
    <Table.Cell>{completed ? 'Completed' : 'In process'}</Table.Cell>
    <Table.Cell>{title}</Table.Cell>
  </Table.Row>
);

TodoItem.propTypes = TodoPropTypes;

export default TodoItem;
