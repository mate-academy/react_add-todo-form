import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Todo.css';

export class Todo extends React.PureComponent {
  state = {
    isCompleted: false,
  }

  handleComletenessChange = () => {
    this.setState(state => ({
      isCompleted: !state.isCompleted,
    }));
  }

  render() {
    const { title, userId } = this.props;
    const { isCompleted } = this.state;

    return (
      <>
        <p className="todo__title">{title}</p>
        <p className="todo__userid">{`UserId: ${userId}`}</p>
        <label className={classNames(
          'todo__completeness',
          { todo__completeness_completed: isCompleted },
        )}
        >
          <input
            type="checkbox"
            className="todo__toggler"
            onChange={this.handleComletenessChange}
          />
          {isCompleted ? 'completed' : 'uncompleted'}
        </label>
      </>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
