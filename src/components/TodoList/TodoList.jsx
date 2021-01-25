import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TodoItem from '../TodoItem/TodoItem';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';

const TodoList = ({ todos }) => (
  <Table inverted className="ui green inverted table" selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Person</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Task</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </Table.Body>
  </Table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoPropTypes).isRequired,
  ).isRequired,
};

export default TodoList;
