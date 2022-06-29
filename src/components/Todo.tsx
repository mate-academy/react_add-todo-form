import { FunctionComponent, memo, useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent, IconButton,
  Typography,
} from '@mui/material';
import { AddTask, RemoveDone } from '@mui/icons-material';

interface TodoProps {
  id: string | number;
  title: string;
  userId: string | number;
  completed: boolean;
  onClick(id: string | number) : void;
}

const Todo: FunctionComponent<TodoProps> = (
  {
    id,
    title,
    userId,
    completed,
    onClick,
  },
) => {
  const onRemoveHandler = useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <Card sx={{ maxWidth: 600, margin: '15px auto 0' }}>
      <CardContent>
        <Typography variant="h5" align="left">
          title:
          {' '}
          {title}
        </Typography>
        <Typography variant="subtitle1" align="right">
          id:
          {' '}
          {id}
        </Typography>
        <Typography variant="subtitle2" align="right">
          userId:
          {' '}
          {userId}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={onRemoveHandler}
          variant="contained"
          color="error"
        >
          Remove Todo
        </Button>
        {completed
          ? <IconButton><AddTask /></IconButton>
          : <IconButton color="error"><RemoveDone /></IconButton>}
      </CardActions>
    </Card>
  );
};

export default memo(Todo);
