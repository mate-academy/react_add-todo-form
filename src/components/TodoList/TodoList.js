import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
    state = {
      checkBoxId: new Map(),
    };

  handleChecked = (todoId, event) => {
    const updatedChecking = event;

    this.setState(prevState => ({
      checkBoxId: prevState.checkBoxId.set(todoId, updatedChecking),
    }));
  }

  handleHighLight = (todoId, checkBoxId) => {
    const styledHighLight = checkBoxId.get(todoId) === true
      ? { textDecoration: 'line-through' }
      : { textDecoration: 'none' };

    return styledHighLight;
  }

  render() {
    const { checkBoxId } = this.state;
    const { generalList } = this.props;

    const usersList = [
      ...generalList,
    ].map((userData, index) => ({
      ...userData,
      id: index,
    }));

    return (
      <ul className="Todo__list">
        <li className="Todo__item Todo__item-pattern">
          <p className="Todo__content Todo__content-pattern">Status</p>
          <p className="Todo__content Todo__content-pattern">Name</p>
          <p className="Todo__content Todo__content-pattern">Title</p>
          <p className="Todo__content Todo__content-pattern">User ID</p>
        </li>
        {usersList.map(todo => (
          <li className="Todo__item" key={todo.id}>
            <input
              type="checkbox"
              className="Todo__content todo__checkbox"
              checked={checkBoxId.get(todo.id) === true}
              onChange={(event) => {
                this.handleChecked(todo.id, event.target.checked);
              }}
            />
            <p className="Todo__content">{todo.name}</p>
            <p
              className="Todo__content"
              style={this.handleHighLight(todo.id, checkBoxId)}
            >
              {todo.task}
            </p>
            <p className="Todo__content">{`User ID ${todo.userId}`}</p>
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  generalList: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default TodoList;
