import React from 'react';
import './TodoForm.css';
import { TodoFormShape } from '../../types';
import { Select } from '../Select';
import { Input } from '../Input';
import { Button } from '../Button';

export const TodoForm = ({
  taskNameMaxLength,
  newTaskName,
  inputAction,
  showInputError,
  selectedUser,
  selectAction,
  users,
  showSelectError,
  addButtonAction,
}) => (
  <form className="input-group flex-nowrap">
    <Input
      maxLength={taskNameMaxLength}
      value={newTaskName}
      action={inputAction}
    />
    {showInputError && (
      <span className="input-error">Please enter the title!</span>
    )}
    <Select
      value={selectedUser}
      action={selectAction}
      users={users}
    />
    {showSelectError && (
      <span className="select-error">Please choose a user!</span>
    )}
    <Button
      text="Add"
      action={addButtonAction}
    />
  </form>
);

TodoForm.propTypes = TodoFormShape;
