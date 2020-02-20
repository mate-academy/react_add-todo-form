import React from 'react';
import { v4 } from 'uuid';
import { Modal } from './components/Modal/Modal';
import { ControlForm } from './components/ControlForm/ControlForm';
import { TodoList } from './components/TodoList/TodoList';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import './reset.css';

import users from './api/users';
import todos from './api/todos';

const todosUsers = todos.map(item => ({
  ...item,
  user: users[item.userId],
}));

const errors = [
  {
    id: 666,
    value: `Allowed entering spaces and alphanumeric characters.`,
  },
  {
    id: 777,
    value: `Task name is very long. Please, make it shorter.`,
  },
  {
    id: 888,
    value: `Please, select user.`,
  },
  {
    id: 999,
    value: `You forgot to write the task.`,
  },
];

export class App extends React.Component {
  state = {
    todoList: [...todosUsers],
    selectedUser: 'users',
    newTask: '',
    errorCode: 0,
    isModalOpen: false,
  }

  handleSelect = (e) => {
    const { value } = e.target;

    this.setState(prev => ({
      errorCode: prev.errorCode !== 0 ? 0 : prev.errorCode,
      isModalOpen: false,
      selectedUser: value,
    }));
  };

  handleInput = (e) => {
    const { value } = e.target;
    const pattern = /[^\d|\s|\w]/g;

    if (pattern.test(value)) {
      this.setState({
        newTask: value,
        errorCode: 666,
        isModalOpen: true,
      });
    } else {
      this.setState(prev => ({
        errorCode: value.length >= 10
          ? 777
          : 0,
        newTask: value,
        isModalOpen: value.length > 10 && prev.errorCode,
      }));
    }
  };

  createNewItem = () => ({
    userId: users.find(el => el.name === this.state.selectedUser).id,
    id: v4().slice(0, 4),
    title: this.state.newTask,
    completed: false,
    user: users.find(user => user.name === this.state.selectedUser),
  })

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTask.length < 1) {
      this.setState({
        errorCode: 999,
        // errorCode: `You forgot to write the task.`,
        isModalOpen: true,
      });

      return;
    }

    if (this.state.selectedUser === 'users') {
      this.setState({
        errorCode: 888,
        // errorCode: `Please, select user.`,
        isModalOpen: true,
      });

      return;
    }

    const newArr = [...this.state.todoList, this.createNewItem()];

    if (!this.state.errorCode) {
      this.setState(prevState => ({
        todoList: [...newArr],
        selectedUser: 'users',
        newTask: '',
        isModalOpen: false,
      }));
    }
  };

  handleCheck = (e) => {
    const checkedItemId = e.target.id;

    const currentItem = this.state.todoList
      .find(item => (`${item.id}`) === checkedItemId);

    const newTodos = this.state.todoList
      .map((item) => {
        if (item.id === currentItem.id) {
          return ({
            ...item,
            completed: e.target.checked,
          });
        }

        return item;
      });

    this.setState({
      todoList: [...newTodos],
    });
  }

  handleModalClose = () => {
    this.setState(prevState => ({
      errorCode: '',
      isModalOpen: false,
    }));
  }

  handleDelete = () => {
    const notReadyTodos = this.state.todoList.filter(todo => !todo.completed);

    this.setState(prevState => ({
      todoList: [...notReadyTodos],
    }));
  }

  render() {
    const {
      todoList,
      isModalOpen,
      errorCode,
      newTask,
      selectedUser,
    } = this.state;

    return (
      <div className="container App">
        <h1 className="title">Add todo form</h1>
        {isModalOpen && (
          <Modal onClose={this.handleModalClose}>
            {errors.find(error => error.id === errorCode).value}
          </Modal>
        )}
        <ControlForm
          users={users}
          newTask={newTask}
          selectValue={selectedUser}
          select={this.handleSelect}
          input={this.handleInput}
          submit={this.handleSubmit}
          deleteDone={this.handleDelete}
        />
        <TodoList todos={todoList} onCheck={this.handleCheck} />
      </div>
    );
  }
}
