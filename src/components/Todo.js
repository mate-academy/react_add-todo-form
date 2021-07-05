import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

class Todo extends React.Component {
  state = {
    isTodoCompleted: false,
  };

  handlerStatusButton = () => {
    this.setState(({ isTodoCompleted }) => ({
      isTodoCompleted: !isTodoCompleted,
    }));
  }

  render() {
    const { id, user, title } = this.props;

    return (
      <li className="card">
        <span className="card__number">{id}</span>
        <User user={user} />
        <p>
          <strong>To-do: </strong>
          <i>{title}</i>
        </p>
        <p>
          <strong>Complete: </strong>
          {
            this.state.isTodoCompleted
              ? <span className="todo__done">Done</span>
              : <span className="todo__notDone">In process</span>
          }
        </p>
        <button
          type="button"
          onClick={this.handlerStatusButton}
          className="todoForm__button todoForm__btn-status"
        >
          <span role="img" aria-label="check-mark">✅</span>
        </button>
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;
