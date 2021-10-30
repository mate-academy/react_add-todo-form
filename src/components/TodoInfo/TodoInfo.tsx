import React from 'react';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title, completed } = todo;

  return (
    <>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{title}</td>
      <td>{completed ? 'Done' : 'In work'}</td>
    </>
  );
};
