import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from './todoList';
import { SelectUser } from './selectUser';
import 'semantic-ui-css/semantic.min.css';

export class AddTodosForm extends React.Component {
  state = {
    todosNew: this.props.todos,
    users: this.props.users,
    userName: '',
    task: '',
    nameEntered: false,
    taskEntered: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodo = (event) => {
    const {
      users,
      todosNew,
      userName,
      task,
    } = this.state;

    if (userName === ''
      || userName === '--choose a User--'
      || task === '') {
      if (userName === '' || userName === '--choose a User--') {
        this.setState({
          nameEntered: true,
        });
      }

      if (task === '') {
        this.setState({
          taskEntered: true,
        });
      }

      return;
    }

    const todo = {
      userId: users.find(user => user.name === userName).id,
      id: todosNew.length + 1,
      title: task,
      user: users.find(user => user.name === userName),
    };

    this.setState(prev => ({
      todosNew: [...prev.todosNew, todo],
      userName: '',
      task: '',
      nameEntered: false,
      taskEntered: false,
    }));
  }

  render() {
    const {
      todosNew,
      users,
      userName,
      task,
      nameEntered,
      taskEntered,
    } = this.state;
    const nameControl = (userName === '' || userName === '--choose a User--')
      ? nameEntered
      : false;
    const taskControl = (task === '')
      ? taskEntered
      : false;

    return (
      <>
        <form className="ui form inverted segment">
          {nameControl && ' Please choose a user ' }
          <br />
          <SelectUser
            users={users}
            userName={userName}
            handleChange={this.handleChange}
          />
          {taskControl && ' Please enter the title '}
          <textarea
            className="field"
            rows="3"
            placeholder="add new task here"
            name="task"
            value={task}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="ui inverted fluid white button"
            onClick={this.addTodo}
          >
            add
          </button>
        </form>
        <TodoList todoList={todosNew} />
      </>
    );
  }
}

AddTodosForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};
