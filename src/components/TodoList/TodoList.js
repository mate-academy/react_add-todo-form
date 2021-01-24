import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import { TypeToDo } from '../../types';
import { ToDo } from '../ToDo/ToDo';

export const TodoList = ({ todos }) => (
  <Container fluid>
    <Row>
      {todos.map(todo => <ToDo key={todo.id} todo={todo} />)}
    </Row>
  </Container>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TypeToDo).isRequired,
};
