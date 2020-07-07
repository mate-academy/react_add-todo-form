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
    todosList: this.props.preparedTodos,
    currentUserId: '',
    currentTodo: '',
    wrongInput: false,
    errorMessage: '',
  }

  onChangeUser = (event) => {
    this.setState({
      currentUserId: +event.target.value,
      wrongInput: false,
    });
  }

  onChangeNewTodo = (value) => {
    const task = value.replace(/[^\w ]+/gi, '').trim();

    this.setState({
      currentTodo: task,
      wrongInput: false,
    });
  }

  onSubmitNewTodo = (event) => {
    event.preventDefault();

    const { currentUserId, currentTodo } = this.state;

    let errorMessage;

    if (!currentUserId
      && !currentTodo) {
      errorMessage = 'Please type correct data';
    } else if (!currentUserId) {
      errorMessage = 'Please choose a user';
    } else if (!currentTodo) {
      errorMessage = 'Please enter the title';
    }

    if (!currentUserId
      || !currentTodo) {
      this.setState({
        wrongInput: true,
        errorMessage,
      });

      return;
    }

    const todo = {
      id: uuidv4(),
      userId: this.state.currentUserId,
      title: this.state.currentTodo,
      completed: false,
      user: this.props.users.find(user => user.id === this.state.currentUserId),
    };

    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo],
      currentUserId: '',
      currentTodo: '',
      wrongInput: false,
    }));

    event.target.reset();
  };

  render() {
    const { users } = this.props;
    const {
      wrongInput,
      errorMessage,
      currentTodo,
      todosList,
    } = this.state;

    return (
      <>
        <NewTodo
          users={users}
          onChangeUser={this.onChangeUser}
          onChangeNewTodo={this.onChangeNewTodo}
          wrongInput={wrongInput}
          onSubmit={this.onSubmitNewTodo}
          errorMessage={errorMessage}
          currentTitle={currentTodo}
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
