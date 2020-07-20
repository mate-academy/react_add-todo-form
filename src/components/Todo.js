import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  state = {
    title: this.props.title,
    completed: this.props.completed,
    username: this.props.username,
  }

  render() {
    return (
      <p>
        {this.state.title.length < 40
          ? this.state.title
          : `${this.state.title.slice(0, 37)}...`}
        {` `}
        <span style={{ color: 'red' }}>
          {this.state.completed ? 'done' : 'not completed'}
        </span>
        {` `}
        <span style={{ color: 'green' }}>
          {this.state.username}
        </span>
      </p>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};
