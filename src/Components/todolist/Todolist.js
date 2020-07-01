import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';
import { Todo } from '../todo/Todo';
import { ShapeTodo } from '../Shapes/ShapeTodo';
import { NewTodo } from '../NewTodo/NewTodo';
import { ShapeUser } from '../Shapes/ShapeUser';

export class TodoList extends React.Component {
  state = {
    todosList: [...this.props.preparedTodos],
    currentUserId: '',
    currentTodo: '',
  }

  onChangeUser = (event) => {
    this.setState({
      currentUserId: +event.target.value,
    });
  }

  onChangeNewTodo = (event) => {
    console.log(event.target.value);
    this.setState({
      currentTodo: event.target.value,
    });
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();

    const todo = {
      id: uuidv4(),
      userId: this.state.currentUserId,
      title: this.state.currentTodo,
      completed: false,
      user: this.props.users.find(user => user.id === this.state.currentUserId),
    };

    console.log(todo.id);

    this.state.todosList.push(todo);

    this.setState(prevState => ({
      todosList: [...prevState.todosList],
      currentUserId: '',
      currentTodo: '',
    }));
    event.target.reset();
  };

  render() {
    const { users } = this.props;

    return (
      <>
        <NewTodo
          users={users}
          currentUserId={this.onChangeUser}
          currentTodo={this.onChangeNewTodo}
          isActiveAdd={
            (Boolean(this.state.currentUserId)
              && Boolean(this.state.currentTodo))
          }
          onSubmit={this.onSubmitNewTodo}
        />
        <ul className="todo-list">
          {this.state.todosList.map(todo => (
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
