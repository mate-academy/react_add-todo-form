import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { Todo } from '../todo/Todo';
import { ShapeTodo } from '../Shapes/ShapeTodo';
import { NewTodo } from '../NewTodo/NewTodo';
import { ShapeUser } from '../Shapes/ShapeUser';

export class TodoList extends React.Component {
  state = {
    todosList: this.props.preparedTodos,
  }

  onAddTodo = (todo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo],
    }));
  }

  render() {
    const { users } = this.props;
    const { todosList } = this.state;

    return (
      <>
        <NewTodo
          users={users}
          onAdd={this.onAddTodo}
        />
        <ul className="list-group">
          {todosList.map(todo => (
            <Todo key={todo.id} todoItem={todo} />
          ))}
        </ul>
      </>
    );
  }
}

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(ShapeTodo).isRequired,
  users: PropTypes.arrayOf(ShapeUser).isRequired,
};
