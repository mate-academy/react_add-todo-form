import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    counterTodoId: 2,
    title: '',
    completed: 'In process',
    user: {
      name: 'Choose a performer',
    },
    titleError: '',
    userError: '',
    isValidated: true,
  };

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
      titleError: '',
      isValidated: true,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.isValidated) {
      this.props.addTodo(this.state.todo);
    }
  };

  handleUser = (event) => {
    this.setState({
      user: { name: event.target.value },
      userError: '',
      isValidated: true,
    });
  };

  handleStatus = (event) => {
    this.setState({
      completed: event.target.value,
    });
  };

  hasError = () => {
    if (!this.state.title && this.state.user.name !== 'Choose a performer') {
      this.setState({
        titleError: 'Please enter the title',
        isValidated: false,
      });

      return true;
    }

    if (this.state.title && this.state.user.name === 'Choose a performer') {
      this.setState({
        userError: 'Choose a performer',
        isValidated: false,
      });

      return true;
    }

    if (!this.state.title && this.state.user.name === 'Choose a performer') {
      this.setState({
        titleError: 'Please enter the title',
        userError: 'Choose a performer',
        isValidated: false,
      });

      return true;
    }

    return false;
  }

  madeTodo = () => {
    if (this.hasError()) {
      return;
    }

    this.setState(prevState => ({
      todo: {
        id: prevState.counterTodoId + 1,
        completed: prevState.completed,
        title: prevState.title,
        user: prevState.user,
      },
      counterTodoId: prevState.counterTodoId + 1,
      title: '',
      completed: 'In process',
      user: {
        name: 'Choose a performer',
      },
    }));
  }

  render() {
    const { performers } = this.props;

    return (
      <div className="wrapper">
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label className="label">
            Write a new task:
            <input
              className="form__item"
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
              placeholder="task"
            />
          </label>
          <div className="error">
            {this.state.titleError}
          </div>

          <label className="label">
            Choose a performer:
            <select
              className="form__item"
              value={this.state.user.name}
              onChange={this.handleUser}
            >
              <option hidden>Choose a performer</option>
              {performers.map(performer => (
                <option key={performer.id}>{performer.name}</option>
              ))}
            </select>
          </label>
          <div className="error">
            {this.state.userError}
          </div>

          <label className="label">
            Select status for new todo:
            <select
              className="form__item"
              value={this.state.completed}
              onChange={this.handleStatus}
            >
              <option>Done</option>
              <option>In process</option>
            </select>
          </label>

          <button
            type="submit"
            className="form__item btn"
            onClick={this.madeTodo}
          >
            Add todo
          </button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
