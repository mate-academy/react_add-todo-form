import React from 'react';

import './TodoCard.scss';

interface Props {
  todoItem: TodoWithUser;
}

export const TodoCard: React.FC<Props> = ({ todoItem }) => {
  return (
    <>
      <p>{`ID: ${todoItem.id}`}</p>
      <h2 className="todo-list__title">{todoItem.title}</h2>
      {todoItem.user && (
        <p>
          {`User: ${todoItem.user.name}`}
        </p>
      )}
    </>
  );
};
