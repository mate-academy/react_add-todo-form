import React from 'react';
import PropTypes from 'prop-types';

class List extends React.PureComponent {
  state = {
    todo: this.props.todo,
    users: this.props.user,
    checkboxStatus: false,
  }

  handlerCB = () => {
    this.setState(({ checkboxStatus }) => ({
      checkboxStatus: !checkboxStatus,
    }));
  }

  render() {
    const executor = (this.state.users
      .filter(user => user.id === this.state.todo.userId))[0].name;

    return (
      <>
        <div className="list__item">
          <p className="list__item_task">{this.state.todo.title}</p>
          <div className={this.state.checkboxStatus
            ? 'list__item_completed'
            : 'list__item_completed-not'}
          >
            <input type="checkbox" onChange={this.handlerCB} />
            {this.state.checkboxStatus
              ? <span>  completed</span>
              : <span>  not completed</span>
            }
          </div>
          <p>
            Executer:
            <span> </span>
            <span className="list__item_person">{executor}</span>
          </p>
        </div>
      </>
    );
  }
}

List.propTypes = {
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

export default List;
