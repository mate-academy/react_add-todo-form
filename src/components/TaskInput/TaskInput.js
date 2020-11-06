import React from 'react';
import { TaskInputShapes } from '../../Shapes';
import './TaskInput.css';

export const TaskInput = ({ flag, change }) => (
  <div className="form-group">
    <label htmlFor="title">
      Task
    </label>
    <input
      id="title"
      className={`form-control ${flag ? 'is-invalid' : ''}`}
      placeholder="Enter task name"
      onChange={event => change(event.target.value)}
    />
    <div
      className="invalid-feedback"
    >
      Please, enter task
    </div>
  </div>
);

TaskInput.propTypes = TaskInputShapes.isRequired;
