import React from 'react';
import PropTypes from 'prop-types';

import { Container, Table } from 'react-bootstrap';

import { Todo } from '../Todo';
import { TodoTypes } from '../../types';

export const TodoList = ({ todos }) => (
  <Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>User</th>
        </tr>
      </thead>
      {todos.map(todo => (
        <tbody key={todo.id}>
          <Todo todo={todo} />
        </tbody>
      ))}
    </Table>
  </Container>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoTypes).isRequired,
};
