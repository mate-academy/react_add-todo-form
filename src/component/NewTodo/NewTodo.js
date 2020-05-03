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
  };

  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  validate = () => {
    let titleError = '';
    // console.log('validate state.todo.title', this.state.todo.title);

    if (!this.state.todo.title) {
      titleError = 'Please enter the title';
    }

    // console.log('titleError', titleError);

    if (titleError) {
      this.setState({ titleError });

      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const isValid = this.validate();

    // if (isValid) {
    //   console.log('state submit', this.state);
    // }

    this.props.addTodo(this.state.todo);

    // this.setState({
    //   titleError: ''
    // })
  };

  handleUser = (event) => {
    this.setState({
      user: event.target.value,
    });
  };

  handleStatus = (event) => {
    this.setState({
      completed: event.target.value,
    });
  };

  madeTodo = () => {
    this.setState(prevState => ({
      todo: {
        id: prevState.counterTodoId + 1,
        completed: prevState.completed,
        title: prevState.title,
        user: { name: prevState.user },
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
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <label>
          Write a new task:
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitle}
            placeholder="task"
          />
        </label>
        <div className="error">
          {this.state.titleError}
        </div>

        <label>
          Choose a performer:
          <select
            value={this.state.user.name}
            onChange={this.handleUser}
          >
            <option hidden>Choose a performer</option>
            {performers.map(performer => (
              <option key={performer.id}>{performer.name}</option>
            ))}
          </select>
        </label>
        <div className="error">{this.state.userError}</div>

        <label>
          Select status for new todo:
          <select
            value={this.state.completed}
            onChange={this.handleStatus}
          >
            <option>Done</option>
            <option>In process</option>
          </select>
        </label>

        <button type="submit" onClick={this.madeTodo}>Add todo</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addTodo: PropTypes.objectOf.isRequired,
};

export default NewTodo;
