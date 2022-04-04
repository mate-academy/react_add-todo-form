import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

type Props = {
  preparedList: PreparedTodo[],
};

export const TodoList: React.FC<Props> = ({ preparedList }) => {
  return (
    <ListGroup className="flex-fill">
      {preparedList.map(todo => (
        <ListGroupItem key={todo.id}>
          <h5>
            {todo.title}
          </h5>
          <p className="text-muted">
            {todo.user?.name}
          </p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};
