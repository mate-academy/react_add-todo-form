import { FC } from 'react';
import { List } from '@mui/material';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos = [] }) => {
  return (
    <List>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </List>
  );
};
