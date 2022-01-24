import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.css';

type Props = {
  currTodos: VisibleTodo[];
};

export const TodoList: React.FC<Props> = ({ currTodos }) => (
  <ul className="App__todo-list todo-list">
    {currTodos.map(todo => (
      <li key={todo.id} className="todo-list__item">
        <Box sx={{ maxWidth: 400 }}>
          <Card variant="outlined">
            <TodoInfo todo={todo} />
          </Card>
        </Box>
      </li>
    ))}
  </ul>
);
