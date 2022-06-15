import React from 'react';
import { Todo } from '../Types/Types';

type Props = {
  todo: Todo
};

export const TodoData: React.FC<Props> = React.memo(({ todo }) => (
  <>
    {`Id: ${todo.id} `}
    <br />
    {`UserId: ${todo.user?.id} `}
    <br />
    {`Title: ${todo.title} `}
    <br />
    {`Completed: ${todo.completed ? 'Yes' : 'No'}`}
  </>
));
