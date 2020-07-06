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
    wrongInput: false,
  }

  onChangeUser = (event) => {
    this.setState({
      currentUserId: +event.target.value,
      wrongInput: false,
    });
  }

  onChangeNewTodo = (value) => {
    const task = value.replace(/[^\w ]+|^[ ]+$/gi, '');

    this.setState({
      currentTodo: task,
      wrongInput: false,
    });
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();

    if (!this.state.currentUserId
      || !this.state.currentTodo) {
      this.setState(prevState => ({
        wrongInput: true,
      }));

      return;
    }

    const todo = {
      id: uuidv4(),
      userId: this.state.currentUserId,
      title: this.state.currentTodo,
      completed: false,
      user: this.props.users.find(user => user.id === this.state.currentUserId),
    };

    this.state.todosList.push(todo);

    this.setState(prevState => ({
      todosList: [...prevState.todosList],
      currentUserId: '',
      currentTodo: '',
      wrongInput: false,
    }));

    event.target.reset();
  };

  render() {
    const { users } = this.props;

    let errorMessage;

    if (!this.state.currentUserId
      && !this.state.currentTodo) {
      errorMessage = 'Please type correct data';
    } else if (!this.state.currentUserId) {
      errorMessage = 'Please choose a user';
    } else if (!this.state.currentTodo) {
      errorMessage = 'Please enter the title';
    }

    return (
      <>
        <NewTodo
          users={users}
          onChangeUser={this.onChangeUser}
          onChangeNewTodo={this.onChangeNewTodo}
          wrongInput={this.state.wrongInput}
          onSubmit={this.onSubmitNewTodo}
          errorMessage={errorMessage}
          currentTitle={this.state.currentTodo}
        />
        <ul className="list-group">
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
