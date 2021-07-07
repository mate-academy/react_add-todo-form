import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Todo extends React.Component {
  state = {
    isChecked: false,
  }

  render() {
    const { isChecked } = this.state;
    const { todo } = this.props;

    return (
      <label
        key={todo.id}
        className={classNames('todo', { checked: isChecked })}
      >
        <input
          type="checkbox"
          onClick={
            () => this.setState(state => ({ isChecked: !state.isChecked }))
          }
        />
        <h1>{todo.id}</h1>
        <h3>{todo.title}</h3>
        <p>
          User id:
          {todo.userId}
        </p>
      </label>
    );
  }
}

Todo.propTypes = {
  todo:
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
};
