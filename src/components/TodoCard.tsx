import { FunctionComponent, memo, useCallback } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from '@mui/material';
import { Todo } from '../models/models';

interface TodoProps {
  todo: Todo;
  onClick(id: number | string): void;
  onComplete(id: number | string): void;

}

const TodoCard: FunctionComponent<TodoProps> = (
  { todo, onClick, onComplete },
) => {
  const onClickHandler = useCallback(() => {
    onClick(todo.id);
  }, [todo.id]);

  const onCompletedHandler = useCallback(() => {
    onComplete(todo.id);
  }, [todo.id]);

  return (
    <Paper sx={{ width: '100%', margin: '0 auto 5px' }}>
      <Box p={2}>
        <Typography variant="h5" align="left">
          {todo.title}
        </Typography>
        <Typography variant="body2" align="right">
          Todo id:
          {
            todo.id
          }
        </Typography>
        <Typography variant="subtitle2" align="right">
          userId:
          {
            todo.userId
          }
        </Typography>
        <ButtonGroup>
          <Button
            onClick={onClickHandler}
            variant="contained"
            color="error"
          >
            remove
          </Button>
          <Button
            color={todo.completed ? 'success' : 'error'}
            onClick={onCompletedHandler}
            variant="text"
            sx={{ width: 130 }}
          >
            { todo.completed ? <CheckIcon /> : 'uncompleted'}
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

export default memo(TodoCard);
