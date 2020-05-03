import React from 'react';
import { Table } from 'semantic-ui-react';
import { todoType } from '../typedefs/todoType';

const TodoItem = ({ item }) => {
  const { id, title, completed, user } = item;

  return (
    <Table.Row warning>
      <Table.Cell>{user.id}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{completed ? 'Complebitur' : 'In processus'}</Table.Cell>
      <Table.Cell textAlign="left">{title}</Table.Cell>
      <Table.Cell>{id}</Table.Cell>
    </Table.Row>
  );
};

TodoItem.propTypes = {
  item: todoType.isRequired,
};

export default TodoItem;
