import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type Props = {
  todo: VisibleTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  todo.user && (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography variant="body2">
          {todo.user.name}
          <br />
          {todo.user.email}
        </Typography>
      </CardContent>
      <CardActions>
        {todo.completed
          ? <div className="ui blue ribbon label">Done</div>
          : <div className="ui red ribbon label">Undone</div>}
      </CardActions>
    </>
  )
);
