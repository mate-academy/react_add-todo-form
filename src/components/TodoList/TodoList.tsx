import { FC } from 'react';
import { Box } from '@mui/material';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <Box sx={{ width: '300px' }}>
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </Box>
  );
};
