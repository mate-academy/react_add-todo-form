import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TodoList = ({ todos }) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Todos</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    {todos.map(todo => (
      <Table.Row>
        <Table.Cell>{todo.id}</Table.Cell>
        <Table.Cell>{todo.user.name}</Table.Cell>
        <Table.Cell>{todo.title}</Table.Cell>
        {todo.completed ? (
          <Table.Cell positive>
            Completed
          </Table.Cell>
        ) : (
          <Table.Cell negative>
            In progress
          </Table.Cell>
        )
        }
      </Table.Row>
    ))}
  </Table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
