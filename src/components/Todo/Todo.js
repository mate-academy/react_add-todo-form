import React from 'react';
import { TypeTodo } from '../../types';
import { User } from '../User';
import { TaskStatus } from '../TaskStatus';
import './Todo.scss';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <>
    {`task: ${title}`}
    <br />
    {`status: `}
    <TaskStatus status={completed} />
    <br />
    <User {...user} />
  </>
);

Todo.propTypes = TypeTodo;
