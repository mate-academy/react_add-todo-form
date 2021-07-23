import React from 'react';
import './TodoForm.css';
import { TodoFormShape } from '../../types';
import { Select } from '../Select';
import { Input } from '../Input';
import { Button } from '../Button';

export class TodoForm extends React.Component {
  state = {
    selectedUser: 'Choose a user',
    newTaskName: '',
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
    const {
      selectedUser,
      newTaskName,
    } = this.state;
    const {
      users,
      currentTodos,
      changeCurrentTodos,
    } = this.props;
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
    }));

    changeCurrentTodos(newTodo);
  }

  render() {
    const {
      users,
    } = this.props;
    const {
      taskNameMaxLength,
      newTaskName,
      showInputError,
      selectedUser,
      showSelectError,
    } = this.state;

    return (
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
    );
  }
}

TodoForm.propTypes = TodoFormShape;
