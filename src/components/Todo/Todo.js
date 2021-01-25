import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  state = {
    completed: this.props.completed,
  }

  handleChange = (event) => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked,
    });
  }

  render() {
    const { title, userId } = this.props;
    const { completed } = this.state;

    return (
      <div className="todo">
        <input
          type="checkbox"
          className="todo__checkbox"
          checked={completed}
          onChange={this.handleChange}
          name="completed"
        />
        <p className="todo__title">
          {title}
        </p>
        <p className="todo__userId">{`User №: ${userId}`}</p>
      </div>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
