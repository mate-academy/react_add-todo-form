import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TodoItem from './TodoItem';
import { todoShape } from './propTypes/todoShape';

const TodoList = ({ list }) => (
  <Table inverted className="ui green inverted table" selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Person</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Task</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {list.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </Table.Body>
  </Table>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(todoShape).isRequired,
};

export default TodoList;
