import React from 'react';
import { UserShape, TodoShape } from './Shapes';
import { UserSelect } from './UserSelect';
import { TaskList } from './TasksList';

export class NewTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: props.todosFromServer,
      task: '',
      value: '',
    };
  }

  addTodo = (event) => {
    this.setState({
      task: event.target.value.trim(),
    });
  }

  userChosen = (event) => {
    this.setState({
      userId: this.props.users.find(
        user => user.name === event.target.value,
      ).id,
      value: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      todos: prevState.todos.concat([{
        title: prevState.task,
        id: prevState.todos.length + 1,
        userId: prevState.userId,
      }]),
    }));

    this.setState({
      task: '',
      value: '',
    });
  }

  render() {
    const { task, todos, value } = this.state;
    const { users } = this.props;

    return (
      <>
        <form className="form" onSubmit={this.submitHandler}>

          <UserSelect
            value={value}
            users={users}
            userChosen={this.userChosen}
          />
          <label className="form__label" htmlFor="task">
            Enter your task:
          </label>
          <input
            className="form__input"
            type="text"
            id="task"
            name="task"
            placeholder="Task name"
            value={task}
            onChange={this.addTodo}
            required
          />
          <button
            type="submit"
            className="form__button"
          >
            Add task
          </button>
        </form>
        <TaskList todos={todos} />
      </>
    );
  }
}

NewTodo.propTypes = {
  users: UserShape.isRequired,
  todosFromServer: TodoShape.isRequired,
};
