import React from 'react';
import './Todo.css';
import { TodoShape } from '../utils/Shapes';

export class Todo extends React.Component {
  state= {
    isCompleted: this.props.task.completed,
  }

  handleComplete = () => this.setState(
    prevState => ({ isCompleted: !prevState.isCompleted }),
  )

  render() {
    const { userId, title } = this.props.task;
    const { isCompleted } = this.state;

    return (
      <div className="task">
        <input
          type="checkbox"
          onChange={this.handleComplete}
          className="task__isComplete"
          defaultChecked={isCompleted}
        />
        <div
          className={isCompleted ? 'task__title-completed' : 'task__title'}
        >
          {title}
        </div>
        <div className="task__user">{`Manager Id ${userId}`}</div>
      </div>
    );
  }
}

Todo.propTypes = {
  task: TodoShape.isRequired,
};
