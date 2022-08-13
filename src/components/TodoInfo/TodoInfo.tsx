import React, { useState } from 'react';
import cn from 'classnames';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
// eslint-disable-next-line max-len
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import { UserInfo } from '../UserInfo/UserInfo';
import { Task } from '../../types/Task';
import '../../App.scss';

type Props = {
  task: Task
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { task } = props;
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.completed);

  return (
    <>
      <Card
        className={cn(isTaskCompleted ? 'completed' : 'not-completed')}
        elevation={4}
        sx={{ minWidth: 250 }}
        key={task.id}
        data-id={task.id}
      >
        <CardContent>
          <div className="checkbox">
            <AssignmentLateOutlinedIcon />
            <FormGroup>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isTaskCompleted}
                    onChange={() => (
                      setIsTaskCompleted(!isTaskCompleted)
                    )}
                  />
                )}
                label="Completed"
              />
            </FormGroup>
          </div>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Task name:
          </Typography>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
        </CardContent>
        <CardActions>
          <UserInfo user={task.user} />
        </CardActions>
      </Card>
    </>
  );
};
