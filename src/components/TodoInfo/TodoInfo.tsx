// Don't forget to import the React library
import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import { PreparedTodo } from '../../react-app-env';
import './TodoInfo.scss';

type Props = {
  todo: PreparedTodo;
};

const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    {todo.user && (
      <UserInfo
        name={todo.user.name}
        email={todo.user.email}
      />
    )}
    <h4 className="todo__title is-6 is-spaced" data-cy="title">
      <strong>About me:</strong>
      <br />
      {todo.title}
    </h4>
    <p
      className="todo__complited is-spased"
      data-cy="status"
    >
      <strong>Status:</strong>
      <br />
      {todo.completed ? 'completed' : 'not completed'}
    </p>
  </>
);

export default TodoInfo;
