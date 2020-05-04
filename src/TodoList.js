import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoList extends React.PureComponent {
  state = {
    todo: this.props.todo,
    users: this.props.user,
    isTodoCompleted: false,
  }

  handlerCheckBox = () => {
    this.setState(({ isTodoCompleted }) => ({
      isTodoCompleted: !isTodoCompleted,
    }));
  }

  render() {
    const executor = (this.state.users
      .find(user => user.id === this.state.todo.userId)).name;

    return (
      <>
        <div className="list__item">
          <p className="list__item_task">{this.state.todo.title}</p>
          <div className={classNames(this.state.isTodoCompleted
            ? 'list__item_completed'
            : 'list__item_completed-not')}
          >
            <input type="checkbox" onChange={this.handlerCheckBox} />
            {this.state.isTodoCompleted
              ? <span>  completed</span>
              : <span>  not completed</span>
            }
          </div>
          <p>
            Executor:
            <span> </span>
            <span className="list__item_person">{executor}</span>
          </p>
        </div>
      </>
    );
  }
}

TodoList.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
