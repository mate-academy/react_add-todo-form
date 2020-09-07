import React from 'react';
import classNames from 'classnames';
import { typeTodo } from '../../propTypes';
import './Todo.css';

export class Todo extends React.Component {
  state = {
    completed: this.props.completed,
  }

  handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked,
    });
  }

  render() {
    const { title, userId } = this.props;
    const { completed } = this.state;

    return (
      <div className={classNames({
        todo: true,
        'todo--completed': completed,
      })}
      >
        <p>
          User id:
          {userId}
        </p>
        <p>
          {'Status: '}
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={this.handleCheckboxChange}
          />
        </p>
        <p>{title}</p>
      </div>
    );
  }
}

Todo.propTypes = typeTodo;
