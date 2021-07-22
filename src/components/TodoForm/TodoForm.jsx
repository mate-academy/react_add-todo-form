import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';
import { TodoShape, UsersShape } from '../../types';
import { TodoList } from '../TodoList';
import { Select } from '../Select';
import { Input } from '../Input';
import { Button } from '../Button';

export class TodoForm extends React.Component {
  state = {
    selectedUser: 'Choose a user',
    newTaskName: '',
    currentTodos: this.props.todos,
    showSelectError: false,
    showInputError: false,
    taskNameMaxLength: 40,
  };

  selectUser = (event) => {
    this.setState({ selectedUser: event.target.value });
    this.setState({ showSelectError: false });
  }

  setTaskName = (event) => {
    this.setState({ newTaskName: event.target.value });
    this.setState({ showInputError: false });
  }

  addTodo = () => {
    const { users } = this.props;
    const {
      selectedUser,
      newTaskName,
      currentTodos,
    } = this.state;
    const newTodoUser = users.find(user => user.name === selectedUser);

    if (newTodoUser === undefined && newTaskName.length === 0) {
      this.setState({ showSelectError: true });
      this.setState({ showInputError: true });

      return;
    }

    if (newTodoUser === undefined) {
      this.setState({ showSelectError: true });

      return;
    }

    if (newTaskName.length === 0) {
      this.setState({ showInputError: true });

      return;
    }

    const newTodoId = currentTodos[currentTodos.length - 1].id + 1;
    const newTodo = {
      userId: newTodoUser.id,
      id: newTodoId,
      title: newTaskName,
      completed: false,
    };

    this.setState(prevState => ({
      selectedUser: 'Choose a user',
      newTaskName: '',
      currentTodos: [...prevState.currentTodos, newTodo],
    }));
  }

  render() {
    const { users } = this.props;
    const {
      selectedUser,
      newTaskName,
      currentTodos,
      showSelectError,
      showInputError,
      taskNameMaxLength,
    } = this.state;

    const preparedTodos = currentTodos.map(todo => ({
      ...todo,
      user: users.find(person => (
        person.id === todo.userId
      )),
    }));

    return (
      <div>
        <TodoList todos={preparedTodos} />
        <h1>Add some Tasks</h1>
        <form className="input-group flex-nowrap">
          <Input
            maxLength={taskNameMaxLength}
            value={newTaskName}
            action={this.setTaskName}
          />
          {showInputError && (
          <span className="input-error">Please enter the title!</span>
          )}
          <Select
            value={selectedUser}
            action={this.selectUser}
            users={users}
          />
          {showSelectError && (
          <span className="select-error">Please choose a user!</span>
          )}
          <Button
            text="Add"
            action={this.addTodo}
          />
        </form>
      </div>
    );
  }
}

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
  users: PropTypes.arrayOf(UsersShape).isRequired,
};
