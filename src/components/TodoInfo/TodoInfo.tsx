import React from 'react';
import { TodoType } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

// Create a `TodoInfo` component accepting a `todo` object and use it in the
// list to render `title`, `completed` status and `User`

// Add a default export statement for TodoInfo component to use it in the other files
type Props = {
  todo: TodoType
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    {todo.user && (
      <UserInfo user={todo.user} />
    )}

    <p data-cy="title">{todo.title}</p>
    <p data-cy="status">
      {todo.completed
        ? 'completed'
        : 'not completed'}
    </p>
  </>
);
