import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { TodosListShape } from '../Shapes/TodosListShape';

class TodoList extends React.Component {
  constructor() {
    super();
    this.changeChecking = this.changeChecking.bind(this);
    this.state = {
      checkBoxId: new Map(),
    };
  }

  changeChecking = (todoId, event) => {
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
    const { dynamicList } = this.props;
    const changedTodos = [...this.props.todosList]
      .map(todo => ({
        userId: todo.userId,
        task: todo.title,
        name: todo.name,
      }));

    const usersList = [...changedTodos, ...dynamicList]
      .map((userData, index) => ({
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
                this.changeChecking(todo.id, event.target.checked);
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
  todosList: TodosListShape.isRequired,
  dynamicList: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default TodoList;
