import React from 'react';
import { Todos } from '../types/Todos';

type Props = {
  todo: Todos,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
  </>
);
