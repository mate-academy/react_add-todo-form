import React from 'react';
import { UserShapes } from '../../Shapes';
import { Button } from '../Button/Button';
import { Selection } from '../Selection/Selection';
import { TaskInput } from '../TaskInput/TaskInput';

export const NewTodo = ({
  onChangeInput,
  onFormSubmit,
  onChangeSelect,
  isInputEmpty,
  isUserChoosed,
  users,
}) => (
  <form onSubmit={onFormSubmit}>
    <TaskInput flag={isInputEmpty} change={onChangeInput} />
    <Selection flag={isUserChoosed} change={onChangeSelect} users={users} />
    <Button buttonName="Add" />
  </form>
);

NewTodo.propTypes = UserShapes.isRequired;
