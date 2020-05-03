import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TodoItem from './TodoItem';
import { todoType } from '../typedefs/todoType';

const TodoList = ({ list }) => (
  <Table celled className="ui blue inverted table" selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User id</Table.HeaderCell>
        <Table.HeaderCell>Person</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Todo id</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {list.map(todo => <TodoItem key={todo.id} item={todo} />)}
    </Table.Body>
  </Table>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(todoType).isRequired,
};

export default TodoList;
