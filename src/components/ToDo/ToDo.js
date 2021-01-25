import React from 'react';
import { Card, Badge, Col } from 'react-bootstrap';
import { TypeToDo } from '../../types';

export const ToDo = ({ todo: { title, userName, completed } }) => (
  <Col>
    <Card style={{
      width: '16rem', marginBottom: '25px',
    }}
    >
      <Card.Body>
        <Card.Title>{userName}</Card.Title>
        <Card.Text>{title}</Card.Text>
        {completed
          ? <Badge variant="success">Done</Badge>
          : <Badge variant="warning">In progress</Badge>}
      </Card.Body>
    </Card>
  </Col>
);

ToDo.propTypes = {
  todo: TypeToDo.isRequired,
};
