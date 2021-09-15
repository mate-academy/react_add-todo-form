import React from 'react';
import './TodoItem.scss';

type Props = {
  todo: PreparedToDo;
};

export const TodoItem:React.FC<Props> = (props) => {
  const { todo } = props;
  const {
    email,
    name,
    status,
    tittle,
  } = todo;

  return (
    <div className="TodoItem">
      <p className="TodoItem__Name">
        {name}
      </p>
      <p className="TodoItem__Email">
        {email}
      </p>
      <p className="TodoItem__taskName">
        {tittle}
      </p>
      <p className="TodoItem__Status">
        {status ? 'Completed' : 'In progress'}
      </p>
    </div>
  );
};
