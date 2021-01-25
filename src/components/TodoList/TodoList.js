import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import { TypeTodo } from '../../types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <Container fluid>
    <Row>
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </Row>
  </Container>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
};
